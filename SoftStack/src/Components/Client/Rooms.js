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
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch rooms on mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, "rooms");
        const sortedQuery = query(roomsRef, orderBy("name"));
        const snapshot = await getDocs(sortedQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Fetch reservations when search is triggered
  const handleSearch = async () => {
    if (!selectedDate) return;

    try {
      const resRef = collection(db, "reservations");
      const snapshot = await getDocs(resRef);
      const data = snapshot.docs.map(doc => doc.data());
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Check if a room is reserved on the selected date
  const isRoomReserved = (roomId) => {
    return reservations.some(res =>
      res.rooms?.some(r =>
        r.room === roomId && r.dates?.includes(selectedDate)
      )
    );
  };

  return (
    <div className="Content-container">
      <Navbar />

      <div className="Search">
        <p>Date</p>
        <input
          type="date"
          className="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
        <button className="Search-button" onClick={handleSearch}>
          🔍 Search
        </button>
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
        {rooms.map(room => {
          const reserved = isRoomReserved(room.id);

          return (
            <div key={room.id} className="cart1">
              <span
                className="available-label"
                style={{
                  backgroundColor: reserved ? "#e74c3c" : "#2ecc71",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold"
                }}
              >
                {reserved ? "Reserved" : "Available"}
              </span>

              <img src={room.imageUrl} alt={room.name} className="Hall1" />

              <div className="Lables1">
                <label className="hall1lable">{room.name}</label>
                <label className="Hall1time">{room.type}</label>

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
                  <label className="Hall1lable1">{room.capacity} Persons</label>
                  <label className="Hall1lable2">{room.type}</label>
                  {room.type.includes("WIFI") && (
                    <label className="Hall1lable3">WIFI</label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default RoomsPage;