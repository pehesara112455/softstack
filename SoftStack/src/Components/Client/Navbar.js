import React, { useState } from 'react';

import '../../Styles/ClientStyles/Navbar-styles.css';
import CECLOGO from '../../Resousers/CECLOGO.jpg';



function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
    <nav className="navbar">
      <div className="logo">C E C</div>
      <img src={CECLOGO} alt="CECLogo" className='navbar-logo' />

      <div className="hamburger" onClick={toggleMenu}>☰</div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/About">About</a></li>
        <li><a href="/TRcenter">Training Centre</a></li>
        <li><a href="/Services">Services</a></li>
        <li><a href="/Programs">Programs</a></li>
        <li><a href="/Contact">Contact</a></li>
      </ul>
    </nav>
  );

    
   
}
export default Navbar;