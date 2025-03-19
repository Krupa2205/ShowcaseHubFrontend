import React, { useState } from "react";
import { motion } from "framer-motion";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      {/* Logo */}
      <div className="text-white text-3xl font-bold cursor-pointer hover:text-pink-500">
        ShowcaseHub🔥
      </div>

      {/* Sign-in and Menu Button */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <button
            onClick={openSignIn}
            className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold"
          >
            Sign In
          </button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-[4.2rem] right-0 h-[45vh] w-80 bg-black bg-opacity-70 z-50 shadow-lg text-white font-extrabold rounded-lg"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-start py-4 px-6 space-y-6 overflow-y-auto">
            <motion.button
              className="block text-lg hover:text-blue-500 transition-colors"
              onClick={() => scrollToSection("home")}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Home
            </motion.button>
            <motion.button
              className="block text-lg hover:text-purple-500 transition-colors"
              onClick={() => scrollToSection("about")}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              About Us
            </motion.button>
            <motion.button
              className="block text-lg hover:text-yellow-300 transition-colors"
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Projects
            </motion.button>
            <motion.button
              className="block text-lg hover:text-red-400 transition-colors"
              onClick={() => scrollToSection("top-builders")}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Creator's
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;