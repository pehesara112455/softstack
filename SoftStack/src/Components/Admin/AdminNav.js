import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Adminstyles/Navbar-styles.css";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // initially visible

  const handleLogout = () => {
    // Add your logout logic here
    // localStorage.removeItem("authToken");
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

            <li><Link to="/reservation">RESERVATIONS</Link></li>
            <li><Link to="/addhallsrooms">ROOMS & HALLS</Link></li>
            <li><Link to="/admin/client-details">CLIENT DETAILS</Link></li>
            <li><Link to="/admin/blog-posts">BLOG POSTS</Link></li>
            <li><Link to="/admin/services">SERVICES</Link></li>
            <li><Link to="/donations">DONATIONS</Link></li>

          </ul>

          <div className="admin-nav-logout">
            <button onClick={handleLogout}>LOG OUT</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNav;
