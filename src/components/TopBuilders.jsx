import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BuilderImageLeft from "../assets/B1.avif"; 
import BuilderImageRight from "../assets/Lap.gif";
import { FaLinkedin, FaGithub } from "react-icons/fa"; 

const TopBuilders = () => {
  const [builders, setBuilders] = useState([]);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [newBuilder, setNewBuilder] = useState({
    image: "",
    name: "",
    description: "",
    linkedin: "",
    github: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilder({ ...newBuilder, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBuilder({ ...newBuilder, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBuilder = () => {
    if (newBuilder.name && newBuilder.description && newBuilder.image) {
      setBuilders([...builders, newBuilder]);
      setNewBuilder({ image: "", name: "", description: "", linkedin: "", github: "" });
      setShowUploadCard(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setShowUploadCard(false);
    setNewBuilder({ image: "", name: "", description: "", linkedin: "", github: "" });
  };

  return (
    <section
      id="top-builders"
      className="py-12 relative bg-gradient-to-r from-pink-300 via-blue-200 to-pink-400 animate-gradient-wave bg-[length:200%_200%]"
    >
      <h2
        className="text-4xl font-extrabold text-gray-800 tracking-wide text-center mb-8"
        style={{ fontFamily: "Kanit, sans-serif" }}
      >
        Top Builders 🏆
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {builders.map((builder, index) => (
          <motion.div
            key={index}
            className="w-72 h-96 bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={builder.image}
              alt={builder.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-700">{builder.name}</h3>
              <p className="text-gray-500 mt-2">{builder.description}</p>
              <div className="flex space-x-4 mt-4">
                {builder.linkedin && (
                  <a href={builder.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} className="text-blue-600" />
                  </a>
                )}
                {builder.github && (
                  <a href={builder.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} className="text-gray-800" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <motion.button
          className="w-36 h-12 text-black rounded-md flex items-center justify-center text-base shadow-md font-bold"
          onClick={() => setShowUploadCard(!showUploadCard)}
          whileHover={{ scale: 1.1 }}
          style={{
            background: "linear-gradient(45deg, #81BFDA, #FEEE91, #2196f3, #FEEE91)",
            backgroundSize: "300% 300%",
            animation: "gradientAnimation 6s ease infinite",
          }}
        >
          + Add Builder
        </motion.button>
      </div>

      <AnimatePresence>
        {showUploadCard && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Left Image */}
              <div className="flex justify-center md:w-1/4 mb-6 md:mb-0">
                <img
                  src={BuilderImageLeft}
                  alt="Builder Left"
                  className="w-48 h-48 object-cover rounded-lg" // Square shape
                />
              </div>
              {/* Form Area */}
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Builder</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Builder Name"
                  value={newBuilder.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  name="description"
                  placeholder="Short Description"
                  value={newBuilder.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mb-4"
                />
                <input
                  type="url"
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={newBuilder.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="url"
                  name="github"
                  placeholder="GitHub URL"
                  value={newBuilder.github}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleAddBuilder}
                    className="w-1/2 text-white py-2 rounded-md transition mr-2 font-bold"
                    style={{
                      background: "linear-gradient(45deg, #A0D683, #72BF78, #A0D683)",
                      backgroundSize: "300% 300%",
                      animation: "gradientAnimation 5s ease infinite",
                    }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-1/2 text-white py-2 rounded-md transition font-bold"
                    style={{
                      background: "linear-gradient(45deg, #f44336, #e57373, #ef9a9a, #ffcdd2)",
                      backgroundSize: "300% 300%",
                      animation: "gradientAnimation 5s ease infinite",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {/* Right Image */}
              <div className="flex justify-center md:w-1/4 mb-6 md:mb-0">
                <img
                  src={BuilderImageRight}
                  alt="Builder Right"
                  className="w-48 h-48 object-cover rounded-lg" // Square shape
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopBuilders;
