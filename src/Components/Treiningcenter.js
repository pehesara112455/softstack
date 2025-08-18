import React, { useState } from "react";
import '../Styles/Treiningcenter-styles.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import TC from '../Resousers/TC.png';
import prime_calendar from '../Resousers/prime_calendar.png';
import hall1 from '../Resousers/hall1.png';
import chair from '../Resousers/chair.png';
import Ac from '../Resousers/Ac.png';
import wifi from '../Resousers/wifi.png';




function Treiningcentre() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  return (
    <div className="tc-container">
      <div className="content">
        <Navbar />
        <h1 className="tc-heading">TRAINING CENTER</h1>

        <img src={TC} alt="Trainingcenter" className="TRC" />

        <div className="Buttonsrow">
          <button
            className={`buttonss ${activeButton === 0 ? 'active' : ''}`}
            onClick={() => handleClick(0)}
          >
            Halls
          </button>
          <button
            className={`buttonss ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            Rooms
          </button>
          <button
            className={`buttonss ${activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            Other facilities 
          </button>
          <button
            className={`buttonss ${activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3)}
          >
            Menus
          </button>
        </div>
        <div className="content-container">
          <div className="Search">
            <p>Date</p>
            <input type="text" className="date" placeholder=" " />
            <img src={prime_calendar} alt="calendar" className="calender"/>
            <button className="Search-button">🔍 Search</button>
          </div>
           <button className="payment-button">For payments 💰</button>
          <div className="carts">
            
            <div className="cart1">
              <span className="available-label">Available</span>

              <img src={hall1} alt="hall1" className="Hall1"/>
              <div className="lables1">
                <label htmlFor="Hallname" className="Hall1lable">HALL No.1</label>
                <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>
                <div className="icons">
                  <div className="chair">
                    <img src={chair}alt="chair"className="chairicon"/>
                  </div>
                  <div className="Ac">
                    <img src={Ac} alt="Ac"className="Acicon"/>
                  </div>
                  <div className="wifi">
                    <img src={wifi} alt="wifi"className="wifiicon"/>
                  </div>
              </div>
              <div className="lables2">
                <label htmlFor="Hallname" className="Hall1lable1">110 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            
            
           
            
            
             
          </div> 
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Treiningcentre;