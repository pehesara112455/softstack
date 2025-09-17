import React from 'react';
import '../../Styles/ClientStyles/Footerstyle.css';



function Footer (){
    return(
        
        <div className="footer">
            <div className="footer-content">
                <div className="contactInfor">
                    <h3>Contact Info</h3>
                    <p>No.117, Thalahena, Malabe, Sri Lanka</p>
                    <p>0112 789 459 / 0777 666 272</p>
                    <p>cec@sltne.lk</p>
                    <p>cecntc13@gmail.com</p>
                </div>
                <div className="quick-links">
                <h3>Quick Links</h3>
                    <ul>
                    <li><a href="/About">About</a></li>
                    <li><a href="/TRcenter">Training Centre</a></li>
                    <li><a href="/Services">Services</a></li>
                    <li><a href="/Programs">Blog</a></li>
                    <li><a href="/Contact">Contact</a></li>
                    
                    </ul>
                </div>
                <div className="follow-us">
                <h3>Follow Us On</h3>
                <p>📘 FACEBOOK</p>
                
                    

                </div>
                <div className='cec1'>
                    <p>
                        © 2025 Community Education Centre. 
                    </p>
                    <p>     All rights reserved.</p>
                </div>


            </div>
        </div>
        
    )
}
export default Footer;