import React from "react";
import '../../Styles/ClientStyles/OtherFacilities.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Room1 from '../../Resousers/Room1.png';
import Room2 from '../../Resousers/Room2.png';

import I4 from '../../Resousers/I4.png';
import I5 from '../../Resousers/I5.png';
import I6 from '../../Resousers/I6.png';
import I7 from '../../Resousers/I7.png';
import I8 from '../../Resousers/I8.png';
import I1 from '../../Resousers/I1.png';




function otherfacilities(){
    return(<div className="content-container">
          
           
          <div className="carts">
            <img src={I1} alt="menus" className="manus"/>
            <div className="ourvasilities">
              <h2>Our facilities</h2>
              <p>At the Community Education Centre, we provide a wide range of modern facilities to ensure your events run smoothly and professionally. Our fully-equipped rooms feature state-of-the-art sound systems, multimedia projectors, and presentation screens to support seminars, workshops, and conferences. Whether you're planning a small meeting, a large-scale event, or a special celebration, our halls are also available for weddings, parties, and other occasions, offering a welcoming and flexible setting to meet all your technical and hospitality needs.</p>
              <div className="ics">
              <img src={I4} alt="img" className="icon"/>
              <img src={I5} alt="img" className="icon"/>              
              <img src={I6} alt="img" className="icon"/>
              <img src={I7} alt="img" className="icon"/>
              <img src={I8} alt="img" className="icon"/>
              </div>
             
             

              


            </div>
          </div> 
        </div>)
}

export default otherfacilities;