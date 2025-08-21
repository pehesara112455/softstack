import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';


import Reservation from './Components/Admin/Reservation'; 
import ClientDetailsPage from './Components/Admin/ClientDetailsPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/clientDetails" element={<ClientDetailsPage/>} />
          {/* Add more routes here if needed */}
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;