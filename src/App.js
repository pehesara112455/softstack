import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';

import AdminNav from './Components/Admin/AdminNav'; // Import the sidebar nav
import AddHallsRooms from './Components/Admin/addhallsrooms';
import AddHallsForm from './Components/Admin/AddHallsForm';
import AddRoomsForm from './Components/Admin/AddRoomsForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hompage />} />
          <Route path="/admin" element={<AdminNav />} />
          <Route path="/addhallsrooms" element={<AddHallsRooms />} />
          <Route path="/addhallsform" element={<AddHallsForm />} />
          <Route path="/addroomsform" element={<AddRoomsForm />} />

          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;