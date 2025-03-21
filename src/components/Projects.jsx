import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import projectImage from "../assets/p1.jpg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";

const Projects = () => {
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    github: "",
    linkedin: "",
    liveLink: "",
    username: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const { openSignIn } = useClerk();
  const [showProgress, setShowProgress] = useState(false); // State for progress bar

  // Fetch projects from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  // Show progress bar for 3 seconds
  useEffect(() => {
    if (showProgress) {
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showProgress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleProjectSubmit = () => {
    if (newProject.title && newProject.description && newProject.username) {
      if (editingIndex !== null) {
        // Update the project
        axios
          .put(
            `http://localhost:5000/api/projects/${projects[editingIndex]._id}`,
            newProject
          )
          .then((response) => {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = response.data;
            setProjects(updatedProjects);
            setEditingIndex(null);
          })
          .catch((error) => {
            console.error("Error updating project:", error);
          });
      } else {
        // Add new project
        axios
          .post("http://localhost:5000/api/projects", newProject)
          .then((response) => {
            setProjects([...projects, response.data]);
          })
          .catch((error) => {
            console.error("Error adding project:", error);
          });
      }
      setNewProject({
        title: "",
        description: "",
        github: "",
        linkedin: "",
        liveLink: "",
        username: "",
      });
      setShowUploadCard(false);
    } else {
      alert(
        "Please fill in the required fields: Title, Description, and Your Name."
      );
    }
  };

  const handleCancel = () => {
    setNewProject({
      title: "",
      description: "",
      github: "",
      linkedin: "",
      liveLink: "",
      username: "",
    });
    setShowUploadCard(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => {
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  return (
    <motion.section
      id="projects"
      className="relative py-16 px-5 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-400 animate-gradient-wave"
    >
      {/* Progress Bar */}
      {showProgress && (
  <div className="fixed top-4 right-4 bg-white border border-green-500 text-black px-4 py-2 rounded-lg shadow-lg animate-slide-in z-[10000] sm:top-8 sm:right-8">
    You must log in to upload projects.
  </div>
)}

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-extrabold text-gray-800 tracking-wide"
            style={{ fontFamily: "Kanit, sans-serif" }}
          >
            Project Showcase 💻
          </h2>
          <p className="text-gray-600 mt-2 font-bold animate-bounce">
            "Showcase your creativity—upload now and let the world see your
            brilliance✨😃!"
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <SignedIn>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-110"
              onClick={() => {
                setShowUploadCard(!showUploadCard);
                setEditingIndex(null);
                setNewProject({
                  title: "",
                  description: "",
                  github: "",
                  linkedin: "",
                  liveLink: "",
                  username: "",
                });
              }}
            >
              +
            </button>
          </SignedIn>
          <SignedOut>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-110"
              onClick={() => {
                setShowProgress(true); // Show progress bar
                openSignIn(); // Open sign-in modal
              }}
            >
              +
            </button>
          </SignedOut>
        </div>

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
                className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto block mx-auto object-cover rounded-lg"
              />

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {editingIndex !== null ? "Edit Project" : "Add New Project"}
                </h3>
                {[
                  { name: "title", placeholder: "Project Title" },
                  { name: "username", placeholder: "Your Name" },
                  { name: "description", placeholder: "Project Description" },
                  { name: "github", placeholder: "GitHub Link" },
                  { name: "linkedin", placeholder: "LinkedIn Link (Optional)" },
                  { name: "liveLink", placeholder: "Live Project Link" },
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
                    {editingIndex !== null ? "Update" : "Submit"}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-shadow transform hover:shadow-2xl hover:scale-105"
              style={{
                width: "320px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">
                {project.title} <br />
                <span className="font-bold italic text-gray-600">
                  by "{project.username}"
                </span>
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {project.description}
              </p>
              <div className="flex justify-center items-center space-x-6 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-3xl transition-transform transform hover:scale-110"
                  >
                    <FaGithub />
                  </a>
                )}
                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-3xl transition-transform transform hover:scale-110"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl transition-transform transform hover:scale-110"
                  >
                    <FiLink />
                  </a>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <SignedIn>
                  <button
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-1 px-3 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition"
                    onClick={() => {
                      setEditingIndex(index);
                      setShowUploadCard(true);
                      setNewProject({
                        ...project,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-1 px-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </SignedIn>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;