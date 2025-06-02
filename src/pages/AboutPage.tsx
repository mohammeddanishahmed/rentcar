import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Zap, Users, Car } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg)',
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About LuxAuto
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Redefining the luxury automotive experience since 2015.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                LuxAuto was founded in 2015 by a group of automotive enthusiasts with a shared vision: to create a premium car marketplace that prioritizes quality, transparency, and exceptional customer service. What began as a small collection of hand-picked luxury vehicles has grown into one of the most trusted names in premium automotive retail.
              </p>
              <p>
                Our journey has been defined by our unwavering commitment to connecting discerning buyers with vehicles that transcend mere transportation. We believe that the right car is more than just a means of getting from point A to point B—it's an expression of personality, achievement, and aspiration.
              </p>
              <p>
                Today, LuxAuto stands as a beacon of excellence in the industry, offering an expertly curated selection of the world's finest automobiles. Our team of specialists personally evaluates each vehicle to ensure it meets our exacting standards before it joins our collection.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At LuxAuto, our values guide everything we do, from the vehicles we select to the service we provide.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                We believe in complete transparency about every vehicle's history, condition, and value. No surprises, no hidden issues.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">
                We are relentless in our pursuit of excellence, from the vehicles we offer to the service we provide to our valued clients.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Dedication</h3>
              <p className="text-gray-600 text-center">
                We're dedicated to creating lasting relationships with our clients, providing personalized service that extends beyond the sale.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LuxAuto</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer an unparalleled luxury car buying experience with exceptional service at every step.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                <Car size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  Every vehicle in our collection has been carefully selected and thoroughly vetted by our team of experts. We only offer the best of the best.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Quality</h3>
                <p className="text-gray-600">
                  All our vehicles undergo a comprehensive inspection process to ensure they meet our stringent quality standards before being offered to our clients.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our team of automotive specialists is passionate about helping you find the perfect vehicle that matches your preferences, lifestyle, and aspirations.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Experience</h3>
                <p className="text-gray-600">
                  From browsing our collection to finalizing your purchase, we've designed every aspect of the LuxAuto experience to be smooth, efficient, and enjoyable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate experts behind LuxAuto who are dedicated to providing you with an exceptional automotive experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg" 
                alt="CEO" 
                className="w-full h-72 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Alexandra Chen</h3>
                <p className="text-red-600 font-medium mb-3">Chief Executive Officer</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years of experience in the luxury automotive industry, Alexandra leads our team with vision and expertise.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg" 
                alt="CTO" 
                className="w-full h-72 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Marcus Johnson</h3>
                <p className="text-red-600 font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Marcus oversees our digital platform, ensuring a seamless online experience for our discerning clientele.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/8100435/pexels-photo-8100435.jpeg" 
                alt="Head of Acquisitions" 
                className="w-full h-72 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Sophia Rodriguez</h3>
                <p className="text-red-600 font-medium mb-3">Head of Acquisitions</p>
                <p className="text-gray-600 text-sm">
                  Sophia leads our vehicle curation team, traveling the world to source the most exceptional automobiles for our collection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;