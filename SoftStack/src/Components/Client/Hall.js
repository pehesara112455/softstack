import React, { useEffect, useState } from "react";
import "../../Styles/ClientStyles/Hallsstyle.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import chair from "../../Resousers/chair.png";
import Ac from "../../Resousers/Ac.png";
import wifi from "../../Resousers/wifi.png";
import hall1 from "../../Resousers/hall1.png"; // fallback image
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

function HallsPage() {
  const [halls, setHalls] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch halls on mount
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const hallsRef = collection(db, "halls");
        const sortedQuery = query(hallsRef, orderBy("name"));
        const snapshot = await getDocs(sortedQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHalls(data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
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

  // Check if a hall is reserved on the selected date
  const isHallReserved = (hallId) => {
    return reservations.some(res =>
      res.rooms?.some(r =>
        r.room === hallId && r.dates?.includes(selectedDate)
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

      <div className="Carts">
        {halls.map(hall => {
          const reserved = isHallReserved(hall.id);

          return (
            <div key={hall.id} className="cart">
              <span
                className="available-label"
                style={{
                  backgroundColor: reserved ? "#bb2413ff" : "#0fa14cff",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold"
                }}
              >
                {reserved ? "Reserved" : "Available"}
              </span>

              <img
                src={hall1}
                alt={hall.name || "Hall"}
                className="hall1img"
              />

              <div className="lable1">
                <label className="Hall1lable">{hall.name || "Unnamed Hall"}</label>
                <label className="Hall1time">8.00 am - 5.00 pm</label>

                <div className="Icons">
                  <div className="chair">
                    <img src={chair} alt="chair" className="chairicon" />
                  </div>
                  {hall.type?.includes("A/C") && (
                    <div className="Ac">
                      <img src={Ac} alt="Ac" className="Acicon" />
                    </div>
                  )}
                  {hall.type?.includes("WIFI") && (
                    <div className="wifi">
                      <img src={wifi} alt="wifi" className="wifiicon" />
                    </div>
                  )}
                </div>

                <div className="Lable2">
                  <label className="Hall1lable1">{hall.capacity || "?"} Persons</label>
                  <label className="Hall1lable2">{hall.type || "Unknown"}</label>
                  {hall.type?.includes("WIFI") && (
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

export default HallsPage;