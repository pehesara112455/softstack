import React from "react";
import '../Styles/Hallsstyle.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import TC from '../Resousers/TC.png';
import prime_calendar from '../Resousers/prime_calendar.png';
import hall1 from '../Resousers/hall1.png';
import chair from '../Resousers/chair.png';
import Ac from '../Resousers/Ac.png';
import wifi from '../Resousers/wifi.png';


function halls(){
    return(<div className="Content-container">
          <div className="search">
            <p>Date</p>
            <input type="text" className="Date" placeholder=" " />
            
            <button className="search-button">🔍 Search</button>
          </div>
           <button className="Payment-button">For payments 💰</button>
          <div className="Carts">
            
            <div className="cart">
              <span className="available-label">Available</span>

              <img src={hall1} alt="hall1" className="hall1img"/>
              <div className="lable1">
                <label htmlFor="Hallname" className="Hall1lable">HALL No.1</label>
                <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>
                <div className="Icons">
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
              <div className="Lable2">
                <label htmlFor="Hallname" className="Hall1lable1">110 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            <div className="cart">
              <span className="available-label">Available</span>

              <img src={hall1} alt="hall1" className="hall1img"/>
              <div className="lable1">
                <label htmlFor="Hallname" className="Hall1lable">HALL No.1</label>
                <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>
                <div className="Icons">
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
              <div className="Lable2">
                <label htmlFor="Hallname" className="Hall1lable1">110 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            <div className="cart">
              <span className="available-label">Available</span>

              <img src={hall1} alt="hall1" className="hall1img"/>
              <div className="lable1">
                <label htmlFor="Hallname" className="Hall1lable">HALL No.1</label>
                <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>
                <div className="Icons">
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
              <div className="Lable2">
                <label htmlFor="Hallname" className="Hall1lable1">110 Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">A/C</label>
                <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>

              </div>
              </div>
              
            </div>
            
            
            
            
           
            
            
             
          </div> 
        </div>)
}

export default halls;