import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';
import About from './Components/About';
import Treiningcenter from './Components/Treiningcenter';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hompage />} />
          {/* Add more routes here if needed */}
          <Route path="/About" element={<About />} />
          <Route path="/Treiningcenter" element={<Treiningcenter />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;