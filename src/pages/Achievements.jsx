import React, { useState, useEffect } from 'react';
import './Achievements.css'; // You can create a new CSS file to style the achievements

const Achievements = () => {
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    profilePic: '',
    username: '',
    description: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Load achievements from localStorage on component mount
  useEffect(() => {
    try {
      const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
      console.log("Loaded achievements from localStorage:", savedAchievements); 
      setAchievements(savedAchievements);
    } catch (error) {
      console.error('Error reading achievements from localStorage:', error);
    }
  }, []);

  // Save achievements to localStorage whenever the achievements array changes
  useEffect(() => {
    console.log("Saving achievements to localStorage:", achievements);  // Debugging line
    localStorage.setItem('achievements', JSON.stringify(achievements));
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
        setNewAchievement({ ...newAchievement, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAchievementSubmit = () => {
    if (newAchievement.username && newAchievement.description) {
      if (editingIndex !== null) {
        const updatedAchievements = [...achievements];
        updatedAchievements[editingIndex] = newAchievement;
        setAchievements(updatedAchievements);
        setEditingIndex(null);
      } else {
        setAchievements([...achievements, newAchievement]);
      }
      setNewAchievement({ profilePic: '', username: '', description: '' });
      setShowUploadCard(false);
    } else {
      alert('Please fill in the required fields: Username and Description.');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewAchievement(achievements[index]);
    setShowUploadCard(true);
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <div className="animated-title">
          <h2 className="section-title">Achievements</h2>
        </div>

        <div className="upload-card">
          <button
            className="upload-button"
            onClick={() => {
              setShowUploadCard(!showUploadCard);
              setEditingIndex(null);
              setNewAchievement({ profilePic: '', username: '', description: '' });
            }}
          >
            +
          </button>
          <p className="upload-text font-bold">Add Achievement</p>
        </div>

        {showUploadCard && (
          <div className="form-card">
            <h3>{editingIndex !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={newAchievement.username}
              onChange={handleInputChange}
              className="form-input"
            />
            <textarea
              name="description"
              placeholder="Achievement Description"
              value={newAchievement.description}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            <button className="submit-button" onClick={handleAchievementSubmit}>
              {editingIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        )}

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="profile-pic-container">
                {achievement.profilePic ? (
                  <img src={achievement.profilePic} alt="Profile" className="profile-pic" />
                ) : (
                  <div className="no-profile-pic">No Image</div>
                )}
              </div>
              <h3 className="achievement-username">{achievement.username}</h3>
              <p className="achievement-description">{achievement.description}</p>
              <br /><br />
              <button className="edit-button" onClick={() => handleEditClick(index)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
