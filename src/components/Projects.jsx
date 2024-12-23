import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <section id="projects" className="py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to the Project's Section 💻
          </h2>
        </motion.div>

        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-green-500 transition"
            onClick={() => {
              setShowUploadCard(!showUploadCard);
              setEditingIndex(null);
              setNewProject({ title: '', description: '', github: '', linkedin: '', liveLink: '', username: '' });
            }}
          >
            +
          </button>
        </div>

        {showUploadCard && (
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">
              {editingIndex !== null ? 'Edit Your Project' : 'Upload Your Project'}
            </h3>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={newProject.username}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={newProject.description}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub Link"
              value={newProject.github}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Post Link (Optional)"
              value={newProject.linkedin}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="liveLink"
              placeholder="Live Project Link"
              value={newProject.liveLink}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={handleProjectSubmit}
              >
                {editingIndex !== null ? 'Update' : 'Submit'}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="mb-2 text-sm text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500 mb-3">Uploaded by: {project.username}</p>
              <div className="flex flex-wrap gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    GitHub
                  </a>
                )}
                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    LinkedIn
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    Live Project
                  </a>
                )}
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;