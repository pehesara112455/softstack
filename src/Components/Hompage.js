
import React from 'react';
import '../Styles/homepage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Slideshow from './Slideshow';
import H1 from '../Resousers/H1.png';
import H2 from '../Resousers/H2.png';
import H3 from '../Resousers/H3.png';
import Footer from './Footer'; // Import Footer component





function Hompage(){
    return(<div className="homepge">
        <div className="H-container">
           <Navbar/>
            <div className='cecname'>
                <p>COMMUNITY </p>
                <p>EDUCATION CENTRE</p> 
           </div>
            <Slideshow/>
            <div className='Services'>
                <div className='h1'>
                    <img src={H2} alt="h2" className='img2' />
                    <h2>Educational Programs</h2>
                    <p>Courses, Trainings and workshops for the community</p>
                </div>
                <div className='h2'>
                    <img src={H3} alt="h3" className='img3' />
                    <h2>Rooms & Halls Reservations</h2>
                    <p>Book facilities for your stayings, meetings, events and more</p>
                </div>
                <div className='h3'>
                    <img src={H1} alt="h1" className='img1' />
                    <h2>Community Events </h2>
                    <p>Stay updated on local events, programs and more.</p>
                </div>
            </div>
          
            <Footer/>
           
           
          
         <Footer/>   
        </div>
    </div>)
} 
export default Hompage;