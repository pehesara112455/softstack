import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import About from './Components/About';
//import Reservation from './Components/Reservation';
//import ClientDetailsPage from './Components/ClientDetailsPage';
import AdminNav from './Components/Admin/AdminNav';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<About />} />
         {/* <Route path="/reservation" element={<Reservation />} /> */}
{/* <Route path="/client-details" element={<ClientDetailsPage />} /> */}
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;