import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hompage from './Components/Hompage';
import Footer from './Components/Footer';
import Blog from './Components/Blog';
import Services from './Components/Services';

import { useEffect } from 'react';

// Create a wrapper component that handles footer visibility
function AppContent() {
  const location = useLocation();
  
  // Determine if we should show the footer
  const showFooter = !location.pathname.startsWith('/admin') && 
                     location.pathname !== '/services';
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Hompage />} />
         <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
       
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;