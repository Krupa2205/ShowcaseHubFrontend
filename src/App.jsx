import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Feedback from './components/Feedback';
import Navbar from './components/Navbar';
import "./index.css";


const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;  

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                
                <Navbar />
                <Header />
                <About />
                <Projects />
                <Profile />
                <Feedback />
                <Footer />
              </>
            } 
          />
          {/* Example of a private route */}
          <Route path="/protected" element={<RedirectToSignIn />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
