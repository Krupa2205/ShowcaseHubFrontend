import React, { useState, useEffect } from 'react';
import './Projects.css';

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

  // Load projects from localStorage on component mount
  useEffect(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      console.log("Loaded projects from localStorage:", savedProjects);  // Debugging line
      setProjects(savedProjects);
    } catch (error) {
      console.error('Error reading projects from localStorage:', error);
    }
  }, []);

  // Save projects to localStorage whenever the projects array changes
  useEffect(() => {
    console.log("Saving projects to localStorage:", projects);  // Debugging line
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

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewProject(projects[index]);
    setShowUploadCard(true);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="animated-title">
          <h2 className="section-title">Welcome to the Project's Section</h2>
        </div>

        <div className="upload-card">
          <button
            className="upload-button"
            onClick={() => {
              setShowUploadCard(!showUploadCard);
              setEditingIndex(null);
              setNewProject({ title: '', description: '', github: '', linkedin: '', liveLink: '', username: '' });
            }}
          >
            +
          </button>
          <p className="upload-text font-bold">Upload Now</p>
        </div>

        {showUploadCard && (
          <div className="form-card">
            <h3>{editingIndex !== null ? 'Edit Your Project' : 'Upload Your Project'}</h3>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={newProject.username}
              onChange={handleInputChange}
              className="form-input"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={newProject.description}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub Link"
              value={newProject.github}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Post Link (Optional)"
              value={newProject.linkedin}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="liveLink"
              placeholder="Live Project Link"
              value={newProject.liveLink}
              onChange={handleInputChange}
              className="form-input"
            />
            <button className="submit-button" onClick={handleProjectSubmit}>
              {editingIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        )}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-username">Uploaded by: {project.username}</p>
              <div className="button-group">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    LinkedIn
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Project
                  </a>
                )}
                <button className="edit-button" onClick={() => handleEditClick(index)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
