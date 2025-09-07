import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Client/Homepage';
import About from './Components/Client/About';
import Reservation from './Components/Admin/Reservation';
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';
import Addhallsrooms from './Components/Admin/Addhallsrooms';
import Services from './Components/Client/Services';
import Programs from './Components/Client/Programs';
import Contact from './Components/Client/Contact';


function App() {
  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} /> 
<Route path="/client-details" element={<ClientDetailsPage />} /> 
<Route path='/Addhallsrooms' element={<Addhallsrooms/>} />
<Route path='/Services' element={<Services/>} />
<Route path='/Programs' element={<Programs/>} />
<Route path='/Contact' element={<Contact/>} />


      
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;