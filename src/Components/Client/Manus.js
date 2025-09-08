import React from "react";
import '../../Styles/ClientStyles/Manus.css';

import menu1 from '../../Resousers/menu1.png';
import menu2 from '../../Resousers/menu2.png';
import menu3 from '../../Resousers/menu3.png';
import menu4 from '../../Resousers/menu4.png';
import menu5 from '../../Resousers/menu5.png';
import menu6 from '../../Resousers/menu6.png';
import menu7 from '../../Resousers/menu7.png';
import menu8 from '../../Resousers/menu8.png';






function otherfacilities(){
    return(<div className="content-container">
          
           
          <div className="carts">
            <div className="menu-note">
  <p>
    Prices and menu items can be changeble. <br />
    We are committed to offering the best quality and may adjust offerings based on availability and seasonal updates.
  </p>
</div>
        <img src={menu1} alt="card" className="card1"/>
        <img src={menu2} alt="card" className="card1"/>
        <img src={menu3} alt="card" className="card1"/>

        <img src={menu4} alt="card" className="card1"/>

        <img src={menu5} alt="card" className="card1"/>

        <img src={menu6} alt="card" className="card1"/>

        <img src={menu7} alt="card" className="card1"/>

        <img src={menu8} alt="card" className="card1"/>



         
          </div> 
        </div>)
}

export default otherfacilities;