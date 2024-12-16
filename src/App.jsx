import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Projects from './pages/Projects';
import { div } from 'framer-motion/client';
import Achievements from './pages/Achievements';
import Footer from './components/Footer';
import TopBuilders from './pages/TopBuilders';

function App() {
  return (
    <div>
    <Header />
    <About />
    <Projects/>
    <Achievements/>
    <TopBuilders/>
    <Footer/>
    </div>
  );
}

export default App;
