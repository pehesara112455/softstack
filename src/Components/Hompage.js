
import React from 'react';
import '../Styles/homepage.css';
import Navbar from './Navbar';
import Footer from './Footer';



function Hompage(){
    return(<div className="homepge">
        <div className="H-container">
            <Navbar/>
            <Footer/>
        </div>
    </div>)
} 
export default Hompage;