import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 3000); // GIF lasts for 3 seconds
  };

  return (
    <motion.footer
      className="bg-gray-700 text-white py-20 mt-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {showEasterEgg && (
        <motion.div
          className="absolute inset-0 z-10 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/awesome.gif" 
            alt="Easter Egg Surprise"
            className="w-64 h-64 object-cover"
          />
        </motion.div>
      )}

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center mb-6 md:mb-0 cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1 }}
        >
          <img
            src="/Logo1.jpg" 
            alt="Syntax Squad Logo"
            className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-full shadow-lg" 
          />
        </motion.div>

        {/* Footer Text */}
        <div className="text-center md:text-right">
          <h2 className="text-4xl font-bold mb-4 cursor-pointer hover:text-blue-400 hover:underline">
          ShowcaseHub 
          </h2>
          <p className="text-lg font-bold">
            &copy; {new Date().getFullYear()} ShowcaseHub . "Learn and Grow Together"
          </p>
          <p className="mt-4 text-sm md:text-base text-gray-400">
            Made with{' '}
            <span
              className="text-red-500 animate-pulse cursor-pointer"
              onClick={handleEasterEgg}
            >
              ❤️
            </span>{' '}
            by Krupa
          </p>

         

          
          <div className="mt-6 flex justify-center space-x-6">
            <motion.a
              href="https://www.linkedin.com/in/kaklotar-k/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </motion.a>
            <motion.a
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-instagram fa-2x"></i>
            </motion.a>
            <motion.a
              href="https://github.com/Krupa2205" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github fa-2x"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
