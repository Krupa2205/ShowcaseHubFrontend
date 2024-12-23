import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    image: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const savedAchievements = JSON.parse(localStorage.getItem("achievements")) || [];
    setAchievements(savedAchievements);
  }, []);

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [achievements]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAchievement({ ...newAchievement, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.name && newAchievement.description && newAchievement.image) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({ image: "", name: "", description: "" });
      setShowUploadCard(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    setShowUploadCard(false);
    setNewAchievement({ image: "", name: "", description: "" });
  };

  return (
    <section id="achievements" className="py-12" style={{ backgroundColor: "#CDC1FF" }}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Achievements 🎉
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {achievements.map((achievement, index) => (
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
              src={achievement.image}
              alt={achievement.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-700">{achievement.name}</h3>
              <p className="text-gray-500 mt-2">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
        <motion.button
          className="w-36 h-12 bg-green-500 text-white rounded-md flex items-center justify-center text-base shadow-md hover:bg-green-600 transition duration-300 font-bold"
          onClick={() => setShowUploadCard(!showUploadCard)}
          whileHover={{ scale: 1.1 }}
        >
          + Add Achievement
        </motion.button>
      </div>
      {showUploadCard && (
        <motion.div
          className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Achievement</h3>
          <input
            type="text"
            name="name"
            placeholder="Achievement Name"
            value={newAchievement.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={newAchievement.description}
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
          <div className="flex justify-between">
            <button
              onClick={handleAddAchievement}
              className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Achievements;