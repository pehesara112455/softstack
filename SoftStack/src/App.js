import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Client/Homepage';
import About from './Components/Client/About';
import Reservation from './Components/Admin/Reservation';
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';
import Addhallsrooms from './Components/Admin/Addhallsrooms';
import EditReseation from './Components/Admin/EditReservation';
import Donations from './Components/Admin/Donations';

function App() {
  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<About />} />

         <Route path="/reservation" element={<Reservation />} /> 
<Route path="/client-details" element={<ClientDetailsPage />} /> 
<Route path="/EditReservation/:reservationId" element={<EditReservation />} />
 <Route path='/Addhallsrooms' element={<Addhallsrooms/>} />
   <Route path='/donations' element={<Donations/>} />

        </Routes>
      
      </Router>
    </div>
  );
}

export default App;