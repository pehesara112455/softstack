import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Client/Hompage';
import About from './Components/Client/About';
import Treiningcenter from './Components/Client/Treiningcenter';
import Loginpage from './Components/Admin/Loginpage';



function App() {
  return (
    <Router>
      <div className="app-container">
        {<Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/About" element={<About />} />

          <Route path="/Treiningcenter" element={<Treiningcenter />} />
          <Route path="/Loginpage" element={<Loginpage />} />


          

          
        </Routes>}
      
      </div>
    </Router>
  );
}

export default App;