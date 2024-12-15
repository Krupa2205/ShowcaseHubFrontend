import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section
      id="about"
      className="relative h-[70vh] w-full flex items-center justify-center bg-gray-200 text-black"
    >
      {/* About Us Content */}
      <motion.div
        className="relative bg-white shadow-lg rounded-xl px-8 py-10 sm:px-5 sm:py-12 max-w-10xl w-[90%] transform transition-all duration-300 hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15)' }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          About Us🔥
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl leading-relaxed text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          We are the <span className='font-bold'>Syntax Squad👋🏻❤💻👾,</span>  dedicated to empowering developers and building futures. Our 
          mission is to inspire creativity, foster innovation, and deliver impactful solutions in 
          the world of technology. Join us as we journey towards a brighter, tech-driven tomorrow.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default About;
