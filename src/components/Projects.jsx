import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectImage from '../assets/p1.jpg'; 

const Projects = () => {
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    github: '',
    linkedin: '',
    liveLink: '',
    username: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      setProjects(savedProjects);
    } catch (error) {
      console.error('Error reading projects from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleProjectSubmit = () => {
    if (newProject.title && newProject.description && newProject.username) {
      if (editingIndex !== null) {
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = newProject;
        setProjects(updatedProjects);
        setEditingIndex(null);
      } else {
        setProjects([...projects, newProject]);
      }
      setNewProject({ title: '', description: '', github: '', linkedin: '', liveLink: '', username: '' });
      setShowUploadCard(false);
    } else {
      alert('Please fill in the required fields: Title, Description, and Your Name.');
    }
  };

  const handleCancel = () => {
    setNewProject({ title: '', description: '', github: '', linkedin: '', liveLink: '', username: '' });
    setShowUploadCard(false);
  };

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (

    
    <motion.section
      id="projects"
      className="relative py-16 px-5 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-400 animate-gradient-wave"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide" style={{ fontFamily: 'Kanit, sans-serif' }}>
        Project Showcase 💻
      </h2>
      <p className="text-gray-600 mt-2 font-bold animate-bounce">
      "Showcase your creativity—upload now and let the world see your brilliance✨😃!"
</p>

        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-110 "
            onClick={() => {
              setShowUploadCard(!showUploadCard);
              setEditingIndex(null);
              setNewProject({ title: '', description: '', github: '', linkedin: '', liveLink: '', username: '' });
            }}
          >
            +
          </button>
        </div>

        {/* Upload Card */}
        {showUploadCard && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
  src={projectImage}
  alt="Project Showcase"
  class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto block mx-auto object-cover rounded-lg"
/>


              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {editingIndex !== null ? 'Edit Project' : 'Add New Project'}
                </h3>
                {[
                  { name: 'title', placeholder: 'Project Title' },
                  { name: 'username', placeholder: 'Your Name' },
                  { name: 'description', placeholder: 'Project Description' },
                  { name: 'github', placeholder: 'GitHub Link' },
                  { name: 'linkedin', placeholder: 'LinkedIn Link (Optional)' },
                  { name: 'liveLink', placeholder: 'Live Project Link' },
                ].map((field, i) => (
                  <div key={i} className="mb-4">
                    <input
                      type="text"
                      name={field.name}
                      value={newProject[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
                    onClick={handleProjectSubmit}
                  >
                    {editingIndex !== null ? 'Update' : 'Submit'}
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-shadow transform hover:shadow-2xl hover:scale-105"
              style={{ width: '320px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{project.description}</p>
              <div className="flex gap-3 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-1 px-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition"
                  >
                    GitHub
                  </a>
                )}
                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-teal-600 text-white py-1 px-3 rounded-lg hover:from-blue-600 hover:to-teal-700 transition"
                  >
                    LinkedIn
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-lime-600 text-white py-1 px-3 rounded-lg hover:from-green-600 hover:to-lime-700 transition"
                  >
                    Live
                  </a>
                )}
                <button
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-1 px-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
