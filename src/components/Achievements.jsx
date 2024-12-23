import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CelebrationImg from "../assets/gold.gif"

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
    <section
      id="achievements"
      className="py-12 relative bg-gradient-to-r from-pink-400 via-blue-200 to-pink-300 animate-gradient-wave bg-[length:200%_200%]"
    >
      <h2
        className="text-4xl font-extrabold text-gray-800 tracking-wide text-center mb-8"
        style={{ fontFamily: "Kanit, sans-serif" }}
      >
        Achievements 🎊
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
          className="w-36 h-12 text-black rounded-md flex items-center justify-center text-base shadow-md font-bold"
          onClick={() => setShowUploadCard(!showUploadCard)}
          whileHover={{ scale: 1.1 }}
          style={{
            background: "linear-gradient(45deg, #81BFDA, #FEEE91, #2196f3, #FEEE91)",
            backgroundSize: "300% 300%",
            animation: "gradientAnimation 6s ease infinite",
          }}
        >
          + Add Achievement
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
              <div className="md:w-1/2 p-4 flex justify-center items-center">
                <img
                  src={CelebrationImg}
                  alt="Showcase GIF"
                  className="w-full h-auto max-w-xs object-contain"
                />
              </div>
              <div className="md:w-1/2 p-4">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
