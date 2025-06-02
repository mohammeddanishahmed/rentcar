import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { User, AuthProviderType } from '../types';
import { app } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: AuthProviderType) => Promise<void>;
  signOut: () => Promise<void>;
  addToFavorites: (carId: string) => Promise<void>;
  removeFromFavorites: (carId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const createUserDocument = async (user: FirebaseUser, additionalData?: { name?: string }) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { email, photoURL, displayName } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          uid: user.uid,
          email,
          displayName: additionalData?.name || displayName,
          photoURL,
          createdAt,
          favorites: []
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }

    // Get the user data and set it in state
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setCurrentUser(userDoc.data() as User);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await createUserDocument(user, { name });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await createUserDocument(user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signInWithProvider = async (provider: AuthProviderType) => {
    try {
      if (provider === 'google') {
        const googleProvider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, googleProvider);
        await createUserDocument(user);
      }
    } catch (error) {
      console.error('Error signing in with provider:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const addToFavorites = async (carId: string) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const updatedFavorites = [...userData.favorites, carId];
        
        await setDoc(userRef, { ...userData, favorites: updatedFavorites }, { merge: true });
        setCurrentUser({ ...currentUser, favorites: updatedFavorites });
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  const removeFromFavorites = async (carId: string) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const updatedFavorites = userData.favorites.filter(id => id !== carId);
        
        await setDoc(userRef, { ...userData, favorites: updatedFavorites }, { merge: true });
        setCurrentUser({ ...currentUser, favorites: updatedFavorites });
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data() as User);
        } else {
          await createUserDocument(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth, db]);

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};