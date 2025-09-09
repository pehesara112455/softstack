import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../Styles/ClientStyles/Hallsstyle.css';
import chair from '../../Resousers/chair.png';
import Ac from '../../Resousers/Ac.png';
import wifi from '../../Resousers/wifi.png';
import hall1 from '../../Resousers/hall1.png';

function Halls() {
  const [halls, setHalls] = useState([]);
  

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'halls'));
        const hallsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHalls(hallsData);
      } catch (error) {
        console.error('Error fetching halls:', error);
      }
    };

    fetchHalls();
  }, []);

  return (
    <div className="Content-container">
      <div className="search">
        <p>Date</p>
        <input type="date" className="Date" placeholder=" " />
        <button className="search-button">🔍 Search</button>
      </div>

      <button
  className="Payment-button"
  onClick={() => {
    window.location.href =
      "mailto:someone@example.com?subject=Payment%20Request&body=Hi,%20I'd%20like%20to%20make%20a%20payment.";
  }}
>
  Payment 💳
</button>

      <div className="Carts">
        {halls.map(hall => (
          <div key={hall.id} className="cart">
            <span className="available-label">Available</span>

            <img src={hall1} alt={hall.name} className="hall1img" />

            <div className="lable1">
              <label htmlFor="Hallname" className="Hall1lable">{hall.name}</label>
              <label htmlFor="Hallname" className="Hall1time">8.00 am - 5.00 pm</label>

              <div className="Icons">
                <div className="chair">
                  <img src={chair} alt="chair" className="chairicon" />
                </div>
                {hall.type.includes('A/C') && (
                  <div className="Ac">
                    <img src={Ac} alt="Ac" className="Acicon" />
                  </div>
                )}
                {hall.type.includes('WIFI') && (
                  <div className="wifi">
                    <img src={wifi} alt="wifi" className="wifiicon" />
                  </div>
                )}
              </div>

              <div className="Lable2">
                <label htmlFor="Hallname" className="Hall1lable1">{hall.capacity} Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">{hall.type}</label>
                {hall.type.includes('WIFI') && (
                  <label htmlFor="Hallname" className="Hall1lable3">WIFI</label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Halls;