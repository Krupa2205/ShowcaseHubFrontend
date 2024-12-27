import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Feedback from "../assets/feedbackImg.jpeg";

const FeedbackForm = () => {
  const formRef = useRef();
  const [feedbackSent, setFeedbackSent] = useState(false); // State to track feedback status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID from .env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID from .env
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID // User ID from .env
      )
      .then(
        (result) => {
          setFeedbackSent(true);
          setName("");
          setEmail("");
          setMessage("");

          // Hide the success message after 3 seconds
          setTimeout(() => {
            setFeedbackSent(false);
          }, 3000); // 3000ms = 3 seconds
        },
        (error) => {
          console.error("Failed to send feedback:", error.text);
        }
      );
  };

  return (
    <motion.section
      id="feedback"
      className="py-12 relative bg-gradient-to-r from-pink-400 via-blue-200 to-pink-300 animate-gradient-wave bg-[length:200%_200%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        style={{ fontFamily: "Kanit, sans-serif" }}
      >
        {/* Left Side Card Image */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Feedback}
            alt="Feedback"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Feedback Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            We Value Your Feedback✨
          </h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 via-green-300 to-purple-400 hover:from-blue-600 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send Feedback
            </button>
          </form>
          {feedbackSent && (
            <div className="mt-4 text-green-600 font-semibold">
              Feedback sent successfully!
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FeedbackForm;
