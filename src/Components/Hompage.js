
import React from 'react';
import '../Styles/homepage.css';
import Navbar from './Navbar';
//import Footer from './Footer';
import Slideshow from './Slideshow';





function Hompage(){
    return(<div className="homepge">
        <div className="H-container">
           <Navbar/>
           <Slideshow/>
           
          
            
        </div>
    </div>)
} 
export default Hompage;