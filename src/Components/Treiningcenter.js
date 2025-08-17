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
            Item 1
          </button>
          <button
            className={`buttonss ${activeButton === 1 ? 'active' : ''}`}
            onClick={() => handleClick(1)}
          >
            Item 2
          </button>
          <button
            className={`buttonss ${activeButton === 2 ? 'active' : ''}`}
            onClick={() => handleClick(2)}
          >
            Item 3
          </button>
          <button
            className={`buttonss ${activeButton === 3 ? 'active' : ''}`}
            onClick={() => handleClick(3)}
          >
            Item 4
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
              <img src={hall1} alt="hall1" className="Hall1"/>
              <div className="lables1">
                <label htmlFor="Hallname" className="Hall1lable">HALL No.1</label>
                <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>
                <div className="icons">
                  <div className="chair">
                    
                  </div>
                  <div className="Ac">
                    
                  </div>
                  <div className="wifi">
                    
                  </div>
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