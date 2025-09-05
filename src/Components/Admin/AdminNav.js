import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "../../Styles/Adminstyles/Navbar-styles.css";
import Blog from './Components/Blog';
import { GiHamburgerMenu } from "react-icons/gi";




const AdminNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    // Logout logic here
    navigate("/login");
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`admin-nav ${isOpen ? "open" : "collapsed"}`}>
      <div className="nav-top">
        <GiHamburgerMenu
          className="hamburger-icon"
          onClick={toggleNav}
        />
        {isOpen && (
          <div className="admin-nav-header">
            <h3>ADMIN PANEL</h3>
          </div>
        )}
      </div>

      {isOpen && (
        <>
          <ul className="admin-nav-list">
            <li><Link to="/admin/reservations">RESERVATIONS</Link></li>
            <li><Link to="/admin/rooms-halls">ROOMS & HALLS</Link></li>
            <li><Link to="/admin/client-details">CLIENT DETAILS</Link></li>
            <li><Link to="/admin/blog-posts">BLOG POSTS</Link></li>
            <li><Link to="/admin/services">SERVICES</Link></li>
            <li><Link to="/admin/donations">DONATIONS</Link></li>
          </ul>

          <div className="admin-nav-logout">
            <button onClick={handleLogout}>LOG OUT</button>
          </div>
        </>
      )}

      <div className="admin-content">
        <Routes>
          <Route path="blog-posts" element={<Blog />} />
          
          {/* Add other admin routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminNav;
