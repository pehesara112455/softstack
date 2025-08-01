import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Navbar from './Components/Navbar';
//import HomePage from './Components/HomePage';
//import Signin from './Components/Signin';
import Hompage from'./Components/Hompage';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Hompage />} />
        {/* Add other pages here */}
      </Routes>
    </Router>
  );
}

export default App;