import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import TopBuilders from './components/TopBuilders';
import Feedback from './components/Feedback';

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
                <Header />
                <About />
                <Projects />
                <Achievements />
                <TopBuilders />
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
