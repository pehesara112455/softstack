import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';
import About from './Components/About';
import Treiningcenter from './Components/Treiningcenter';
import Hall from './Components/Hall';

function App() {
  return (
    <Router>
      <div className="app-container">
        {<Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/About" element={<About />} />

          <Route path="/Treiningcenter" element={<Treiningcenter />} />

          

          
        </Routes>}
      
      </div>
    </Router>
  );
}

export default App;