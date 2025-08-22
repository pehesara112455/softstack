import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';
import About from './Components/About';
import Treiningcenter from './Components/Treiningcenter';
import Hall from './Components/Hall';
import Reservation from './Components/Admin/Reservation'; 
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';


function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/clientdetails" element={<ClientDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;