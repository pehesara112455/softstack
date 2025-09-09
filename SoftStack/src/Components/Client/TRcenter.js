import React, { useState } from "react";
import '../../Styles/ClientStyles/Treiningcenter-styles.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import TC from '../../Resousers/TC.png';
import Hall from './Hall';
import Rooms from './Rooms';
import Manus from './Manus';


import OtherFacilities from './OtherFacilities';



function Trainingcenter() {
  const [activeButton, setActiveButton] = useState(0);

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

         <div className="Content-container">
          {activeButton === 0 && <Hall />}
          {activeButton === 1 && <Rooms/>}
          {activeButton === 2 && <OtherFacilities/>}
          {activeButton === 3 && <Manus/>}
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Trainingcenter;