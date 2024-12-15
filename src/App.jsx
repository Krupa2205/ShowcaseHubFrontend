import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Projects from './pages/Projects';
import Upload from './pages/Upload';
import { div } from 'framer-motion/client';
import Achievements from './pages/Achievements';

function App() {
  return (
    <div>
    <Header />
    <About />
    <Projects/>
    <Achievements/>
    </div>
  );
}

export default App;
