import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Builder from "../assets/TopBuilder.gif"; 
import { FaLinkedin, FaGithub } from "react-icons/fa";
import axios from "axios";

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

  // Fetch existing builders from backend ....
  useEffect(() => {
    axios.get("http://localhost:5000/api/topbuilder")
      .then(response => {
        setBuilders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching builders:", error);
      });
  }, []);

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
      axios.post("http://localhost:5000/api/topbuilder/add", {
        name: newBuilder.name,
        description: newBuilder.description,
        linkedin: newBuilder.linkedin,
        github: newBuilder.github,
        profileImage: newBuilder.image,
      })
      .then(response => {
        setBuilders([...builders, response.data]);
        setNewBuilder({
          image: "",
          name: "",
          description: "",
          linkedin: "",
          github: "",
        });
        setShowUploadCard(false);
      })
      .catch(error => {
        alert("There was an error adding the builder:", error);
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setShowUploadCard(false);
    setNewBuilder({
      image: "",
      name: "",
      description: "",
      linkedin: "",
      github: "",
    });
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
        {/* Top Builders 🏆 */}
        Your Profiles🏆
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {builders.map((builder, index) => (
          <motion.div
            key={index}
            className="w-72 h-96 bg-gradient-to-r from-pink-200 via-white-400 to-blue-100 rounded-lg shadow-lg overflow-hidden relative"
            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={builder.profileImage}
              alt={builder.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-700">{builder.name}</h3>
              <p className="text-gray-500 mt-2">{builder.description}</p>
              <div className="flex space-x-6 justify-center mt-4">
                {builder.linkedin && (
                  <a
                    href={builder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={28} className="text-blue-600" />
                  </a>
                )}
                {builder.github && (
                  <a
                    href={builder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={28} className="text-gray-800" />
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
            background:
              "linear-gradient(45deg, #81BFDA, #FEEE91, #2196f3, #FEEE91)",
            backgroundSize: "300% 300%",
            animation: "gradientAnimation 6s ease infinite",
          }}
        >
          + Add your Profile
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
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={Builder}
                alt="Builder Left"
                className="w-32 h-32 object-cover rounded-full mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Add New Builder
              </h3>
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
                placeholder="Short Description: Ex. Full stack developer"
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
              <div className="flex justify-between w-full">
                <button
                  onClick={handleAddBuilder}
                  className="w-1/2 text-white py-2 rounded-md mr-2 font-bold bg-gradient-to-r from-green-400 to-green-600"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancel}
                  className="w-1/2 text-white py-2 rounded-md font-bold bg-gradient-to-r from-red-400 to-red-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopBuilders;
