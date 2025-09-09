import React, { useEffect, useState } from "react";
import "../../Styles/ClientStyles/Roomsstyle.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Person from "../../Resousers/Person.png";
import Ac from "../../Resousers/Ac.png";
import wifi from "../../Resousers/wifi.png";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, "rooms");
        const sortedQuery = query(roomsRef, orderBy("name")); // 🔤 Sort by name
        const querySnapshot = await getDocs(sortedQuery);
        const roomsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="Content-container">
      <Navbar />

      <div className="Search">
        <p>Date</p>
        <input type="text" className="date" placeholder=" " />
        <button className="Search-button">🔍 Search</button>
      </div>

      <button
  className="payment-button"
  onClick={() => {
    window.location.href =
      "mailto:someone@example.com?subject=Payment%20Request&body=Hi,%20I'd%20like%20to%20make%20a%20payment.";
  }}
>
  For payments 💰
</button>

      <div className="cartss">
        {rooms.map(room => (
          <div key={room.id} className="cart1">
            <span className="available-label">
              {room.status === "reserved" ? "Reserved" : "Available"}
            </span>

            <img src={room.imageUrl} alt={room.name} className="Hall1" />

            <div className="Lables1">
              <label htmlFor="Hallname" className="hall1lable">{room.name}</label>
              <label htmlFor="Hallname" className="Hall1time">{room.type}</label>

              <div className="icons">
                <div className="chair">
                  <img src={Person} alt="person" className="chairicon1" />
                </div>
                {room.type.includes("A/C") && (
                  <div className="Ac">
                    <img src={Ac} alt="Ac" className="Acicon" />
                  </div>
                )}
                {room.type.includes("WIFI") && (
                  <div className="wifi">
                    <img src={wifi} alt="wifi" className="wifiicon" />
                  </div>
                )}
              </div>

              <div className="lables2">
                <label htmlFor="Hallname" className="Hall1lable1">{room.capacity} Persons</label>
                <label htmlFor="Hallname" className="Hall1lable2">{room.type}</label>
                {room.type.includes("WIFI") && (
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

export default RoomsPage;