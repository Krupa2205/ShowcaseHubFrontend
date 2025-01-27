import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CelebrationImg from "../assets/BgCardImg.jpg";
import goldImg from "../assets/gold.gif";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    teamOrSingleName: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/achievements")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAchievements(response.data);
        } else {
          console.error("Unexpected response format: Expected an array.");
          setAchievements([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching achievements:", error);
        setAchievements([]); 
      });
  }, []);

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.teamOrSingleName) {
      axios
        .post("http://localhost:5000/api/achievements", newAchievement)
        .then((response) => {
          setAchievements([...achievements, response.data]);
          setNewAchievement({ title: "", description: "", teamOrSingleName: "" });  
          setShowUploadCard(false);
        })
        .catch((error) => console.error("Error saving achievement:", error));
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteAchievement = (id) => {
    axios
      .delete(`http://localhost:5000/api/achievements/${id}`)
      .then(() => {
        setAchievements(achievements.filter((achievement) => achievement._id !== id));  
      })
      .catch((error) => console.error("Error deleting achievement:", error));
  };

  const handleCancel = () => {
    setShowUploadCard(false);
    setNewAchievement({ title: "", description: "", teamOrSingleName: "" });  
  };

  return (
    <section id="achievements" className="py-12 relative bg-gradient-to-r from-pink-400 via-blue-200 to-pink-300 animate-gradient-wave bg-[length:200%_200%]">
      <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide text-center mb-8" style={{ fontFamily: "Kanit, sans-serif" }}>
        Achievements 🎊
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement._id}
            className="w-72 h-96 bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url(${CelebrationImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-white bg-opacity-90 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">{achievement.title}</h3>
              <p className="text-gray-500 mt-2">{achievement.description}</p>
              <p className="text-gray-500 mt-2">Team/Single: {achievement.teamOrSingleName}</p>
              <button
                onClick={() => {
                  setShowUploadCard(true);
                  setNewAchievement({ ...achievement });
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-1 px-3 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAchievement(achievement._id)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-1 px-3 rounded-lg mt-2 ml-2 hover:from-red-600 hover:to-pink-700 transition"
              >
                Delete
              </button>
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
                  src={goldImg}
                  alt="Showcase GIF"
                  className="w-full h-auto max-w-xs object-contain"
                />
              </div>
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Achievement</h3>
                <input
                  type="text"
                  name="title"  
                  placeholder="Achievement Title"  
                  value={newAchievement.title}  
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}  
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  name="description"
                  placeholder="Short Description"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  name="teamOrSingleName"
                  placeholder="Team/Single Name"
                  value={newAchievement.teamOrSingleName}
                  onChange={(e) => setNewAchievement({ ...newAchievement, teamOrSingleName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleAddAchievement}
                    className="w-1/2 text-white py-2 rounded-md transition mr-2 font-bold"
                    style={{
                      background: "linear-gradient(45deg, #A0D683, #72BF78, #A0D683)",
                      backgroundSize: "300% 300%",
                      animation: "gradientAnimation 6s ease infinite",
                    }}
                  >
                    Save Achievement
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-1/2 text-white py-2 rounded-md bg-red-500 hover:bg-red-600 transition font-bold"
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
