import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';

import AdminNav from './Components/Admin/AdminNav'; // Import the sidebar nav
import AddHallsRooms from './Components/Admin/addhallsrooms';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/admin" element={<AdminNav />} />
          <Route path="/addhallsrooms" element={<AddHallsRooms />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;