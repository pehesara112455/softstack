import React from "react";
import '../../Styles/ClientStyles/Roomsstyle.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Room1 from '../../Resousers/Room1.png';
import Room2 from '../../Resousers/Room2.png';

import prime_calendar from '../../Resousers/prime_calendar.png';
import hall1 from '../../Resousers/hall1.png';
import Person from '../../Resousers/Person.png';
import Ac from '../../Resousers/Ac.png';
import wifi from '../../Resousers/wifi.png';


function halls(){
    return(<div className="Content-container">
          <div className="Search">
            <p>Date</p>
            <input type="text" className="date" placeholder=" " />
            
            <button className="Search-button">🔍 Search</button>
          </div>
           <button className="payment-button">For payments 💰</button>
          <div className="cartss">
            
            <div className="cart1">
              <span className="available-label">Available</span>

              <img src={Room1} alt="hall1" className="Hall1"/>
              <div className="Lables1">
                <label htmlFor="Hallname" className="hall1lable">ROOM No.1</label>
                <label htmlFor="Hallname" className="Hall1time">Double room</label>
                <div className="icons">
                  <div className="chair">
                    <img src={Person}alt="chair"className="chairicon1"/>
                  </div>
                  <div className="Ac">
                    <img src={Ac} alt="Ac"className="Acicon"/>
                  </div>
                  <div className="wifi">
                    <img src={wifi} alt="wifi"className="wifiicon"/>
                  </div>
              </div>
              <div className="lables2">
                <label htmlFor="Hallname" className="Hall1lable1">1 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            <div className="cart1">
              <span className="available-label">Available</span>

              <img src={Room2} alt="hall1" className="Hall1"/>
              <div className="lables1">
                <label htmlFor="Hallname" className="Hall1lable">ROOM No.2</label>
                <label htmlFor="Hallname" className="Hall1time">Double room</label>
                <div className="icons">
                  <div className="chair">
                    <img src={Person}alt="chair"className="chairicon"/>
                  </div>
                  <div className="Ac">
                    <img src={Ac} alt="Ac"className="Acicon"/>
                  </div>
                  <div className="wifi">
                    <img src={wifi} alt="wifi"className="wifiicon"/>
                  </div>
              </div>
              <div className="lables2">
                <label htmlFor="Hallname" className="Hall1lable1">2 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            <div className="cart1">
              <span className="available-label">Available</span>

              <img src={hall1} alt="hall1" className="Hall1"/>
              <div className="lables1">
                <label htmlFor="Hallname" className="Hall1lable">ROOM No.3</label>
                <label htmlFor="Hallname" className="Hall1time">Single room</label>
                <div className="icons">
                  <div className="chair">
                    <img src={Person}alt="chair"className="chairicon"/>
                  </div>
                  <div className="Ac">
                    <img src={Ac} alt="Ac"className="Acicon"/>
                  </div>
                  <div className="wifi">
                    <img src={wifi} alt="wifi"className="wifiicon"/>
                  </div>
              </div>
              <div className="lables2">
                <label htmlFor="Hallname" className="Hall1lable1">3 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            
            
           
            
            
             
          </div> 
        </div>)
}

export default halls;