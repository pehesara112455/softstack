import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Client/Homepage';
import About from './Components/Client/About';
import Reservation from './Components/Admin/Reservation';
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';
import Addhallsrooms from './Components/Admin/Addhallsrooms';

import EditReservation from './Components/Admin/EditReservation';
import Donations from './Components/Admin/Donations';
import Services from './Components/Admin/Services';
import Blog from './Components/Admin/Blog';


import Donations from './Components/Admin/Donations';
import TRcenter from './Components/Client/TRcenter';
import Hall from './Components/Client/Hall';
import Loginpage from './Components/Admin/Loginpage';
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
<Route path="/clientDetails" element={<ClientDetailsPage />} /> 
<Route path="/EditReservation/:reservationId" element={<EditReservation />} />
 <Route path='/Addhallsrooms' element={<Addhallsrooms/>} />
   <Route path='/donations' element={<Donations/>} />
   <Route path='/services' element={<Services/>} />
   <Route path='/blog' element={<Blog />} />

         
          <Route path='/TRcenter' element={<TRcenter/>} />
          <Route path='/Loginpage' element={<Loginpage/>} />
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