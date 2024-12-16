import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const TopBuilders = () => {
  const [builders, setBuilders] = useState([]);
  const [newBuilder, setNewBuilder] = useState({
    profilePic: '',
    username: '',
    linkedin: '',
    github: '',
  });

  const [showUploadCard, setShowUploadCard] = useState(false);

  // Load builders from localStorage
  useEffect(() => {
    const savedBuilders = JSON.parse(localStorage.getItem('builders')) || [];
    setBuilders(savedBuilders);
  }, []);

  // Save builders to localStorage whenever the builders array changes
  useEffect(() => {
    localStorage.setItem('builders', JSON.stringify(builders));
  }, [builders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilder({ ...newBuilder, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBuilder({ ...newBuilder, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBuilderSubmit = () => {
    if (newBuilder.username && newBuilder.linkedin && newBuilder.github) {
      setBuilders([...builders, newBuilder]);
      setNewBuilder({ profilePic: '', username: '', linkedin: '', github: '' });
      setShowUploadCard(false);
    } else {
      alert('Please fill in all the fields: Name, LinkedIn, and GitHub.');
    }
  };

  return (
    <section id="top-builders" className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Top Builders🔥</h2>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
            onClick={() => setShowUploadCard(!showUploadCard)}
          >
            Add Builder
          </button>
        </div>

        {showUploadCard && (
          <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Builder</h3>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={newBuilder.username}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded mb-4 p-2"
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={newBuilder.linkedin}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded mb-4 p-2"
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub Profile URL"
              value={newBuilder.github}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded mb-4 p-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full border-gray-300 rounded mb-4 p-2"
            />
            <button
              onClick={handleBuilderSubmit}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {builders.map((builder, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="rounded-full overflow-hidden border-4 border-blue-400 mb-4 w-24 h-24">
                {builder.profilePic ? (
                  <img src={builder.profilePic} alt={builder.username} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{builder.username}</h3>
              <div className="flex gap-4 mt-2">
                <a
                  href={builder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={builder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FaGithub size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBuilders;
