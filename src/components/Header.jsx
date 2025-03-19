import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // Import the Navbar component

function Header() {
  return (
    <header className="py-12 relative bg-gradient-to-r from-pink-300 via-blue-200 to-pink-400 animate-gradient-wave bg-[length:200%_200%]">
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <Navbar />

      {/* Header Content */}
      <div
        id="home"
        className="relative z-10 flex flex-col items-center space-y-6 mt-16"
      >
        <motion.img
          src="/Logo1.jpg"
          alt="Syntax Squad Logo"
          className="h-32 w-32 rounded-full shadow-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.h1
          className="text-3xl sm:text-6xl font-bold tracking-wide text-center text-white cursor-pointer"
          style={{ fontFamily: "Kanit, sans-serif" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            color: "#E53888",
          }}
        >
          Welcome to the <span className="text-pink-500">ShowcaseHub</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl text-white font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          "From Code to Creation: ShowcaseHub🔥"
        </motion.p>
      </div>
    </header>
  );
}

export default Header;