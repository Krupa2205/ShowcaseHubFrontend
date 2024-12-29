import React from 'react';
import { motion } from 'framer-motion';
import AboutImg from "../assets/AboutImg.jpeg";

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-pink-200 via-blue-100 to-pink-300 animate-gradient-wave bg-[length:200%_200%] p-4"
    >
      {/* Left Image/GIF */}
      <motion.div className="flex w-full sm:w-[45%] lg:w-[45%] h-full mb-8 sm:mb-0 sm:mr-8">
        <motion.img
          src={AboutImg}
          alt="Decorative Image"
          className="w-full h-full object-cover rounded-xl shadow-lg transform transition-all duration-300 hover:scale-95"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* About Us Card */}
      <motion.div
        className="relative shadow-lg rounded-xl px-8 py-12 sm:px-10 sm:py-16 lg:py-20 w-full sm:w-[45%] lg:w-[45%] max-w-[900px] transform transition-all duration-300 hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          boxShadow:
            "0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(135deg, #E3F0AF, #BCCCDC, #E4F1AC)",
        }}
      >
        <motion.h2
          className="text-4xl sm:text-3xl lg:text-5xl font-extrabold text-gray-800 tracking-wide text-center mb-8"
          style={{ fontFamily: "Kanit, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Us 👋🏻
        </motion.h2>
        <motion.p
          className="text-lg sm:text-base lg:text-xl leading-relaxed text-center"
          initial={{ opacity: 0, y: 20, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 0.95 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            scale: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            },
          }}
        >
          We are the <span className="font-bold">Syntax Squad 👋🏻❤️💻</span> Dedicated to empowering developers and
          building brighter futures, our mission is to inspire creativity,
          foster innovation, and deliver impactful solutions in the
          ever-evolving world of technology. Join us as we embark on an exciting
          journey towards a tech-driven tomorrow! ✨ <span className="font-bold"> <span className="font-semibold">Don’t
          wait—join us today! Let’s learn, grow, and innovate together with the
          SYNTAX SQUAD!</span>
        </motion.p>

        {/* WhatsApp Join Now */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://chat.whatsapp.com/Db2jMSIq8G51P7rDSQb14A"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <img
              src="/Whatsapp.png"
              alt="WhatsApp Logo"
              className="w-6 h-6 mr-2"
            />
            Join Now on WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
