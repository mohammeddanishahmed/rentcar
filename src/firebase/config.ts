import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBWjR9fFH4HE0NuF-bpgB5MJcErQNXOF8M",
  authDomain: "premium-car-showcase.firebaseapp.com",
  projectId: "premium-car-showcase",
  storageBucket: "premium-car-showcase.appspot.com",
  messagingSenderId: "845612764523",
  appId: "1:845612764523:web:4a5e6d8b1c09be2f7b4e89"
};

export const app = initializeApp(firebaseConfig);