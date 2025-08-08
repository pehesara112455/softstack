import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hompage from './Components/Hompage';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hompage />} />
          {/* Add more routes here if needed */}
        </Routes>
      <Footer/>{}
      </div>
    </Router>
  );
}

export default App;