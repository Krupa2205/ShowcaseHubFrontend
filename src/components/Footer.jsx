import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-400 py-16 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center text-gray-700">
        {/* WhatsApp Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="w-12 h-12" 
          />
        </div>
        
        {/* "Syntax Squad" Font */}
        <h2 className="text-3xl font-bold text-black mb-4 cursor-pointer">
          Syntax Squad
        </h2>

        {/* Copyright and Footer Text */}
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
        </p>
        <p class="mt-4 md:mt-0 text-sm md:text-base text-black text-center font-bold">
            Made with <span class="text-black-500 animate-pulse">❤️</span> <span className='font-bold'>by Krupa</span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
