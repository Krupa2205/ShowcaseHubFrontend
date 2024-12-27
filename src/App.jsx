import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import { div } from 'framer-motion/client';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import TopBuilders from './components/TopBuilders';
import Feedback from './components/Feedback';

function App() {
  return (
    <div>
    <Header />
    <About />
    <Projects/>
    <Achievements/>
    <TopBuilders/>
    <Feedback/>
    <Footer/>
    </div>
  );
}

export default App;