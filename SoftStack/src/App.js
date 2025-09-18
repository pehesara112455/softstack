import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Client Components
import Homepage from './Components/Client/Homepage';
import About from './Components/Client/About';
import TRcenter from './Components/Client/TRcenter';
import Hall from './Components/Client/Hall';
import ServicesClient from './Components/Client/Services';
import Programs from './Components/Client/Programs';
import Contact from './Components/Client/Contact';

// Admin Components
import Reservation from './Components/Admin/Reservation';
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';
import Addhallsrooms from './Components/Admin/Addhallsrooms';
import EditReservation from './Components/Admin/EditReservation';
import Donations from './Components/Admin/Donations';
import ServicesAdmin from './Components/Admin/Services';
import Blog from './Components/Admin/Blog';
import Loginpage from './Components/Admin/Loginpage';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/TRcenter" element={<TRcenter />} />
          <Route path="/hall" element={<Hall />} />
          <Route path="/services" element={<ServicesClient />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Loginpage" element={<Loginpage />} />

          {/* Admin Routes */}
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/client-details" element={<ClientDetailsPage />} />
          <Route path="/edit-reservation/:reservationId" element={<EditReservation />} />
          <Route path="/add-halls-rooms" element={<Addhallsrooms />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/admin-services" element={<ServicesAdmin />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;