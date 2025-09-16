import React, { useEffect, useState } from "react";
import "../../Styles/ClientStyles/Hallsstyle.css";
import chair from "../../Resousers/chair.png";
import Ac from "../../Resousers/Ac.png";
import wifi from "../../Resousers/wifi.png";
import hall1 from "../../Resousers/hall1.png"; // fallback image

function Halls() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔧 Injecting test data directly
    const fetchHalls = async () => {
      try {
        const testData = [
          { id: "test1", name: "Hall A", type: "A/C WIFI", capacity: 100 },
          { id: "test2", name: "Hall B", type: "Non A/C", capacity: 80 },
          { id: "test3", name: "Hall C", type: "A/C", capacity: 120 }
        ];
        setHalls(testData);
      } catch (error) {
        console.error("Error loading test data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  return (
    <div className="Content-container">
      <div className="search">
        <p>Date</p>
        <input type="date" className="Date" />
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
        {loading ? (
          <p className="loading">Loading halls...</p>
        ) : halls.length === 0 ? (
          <p className="no-data">No halls available.</p>
        ) : (
          halls.map(hall => (
            <div key={hall.id} className="cart">
              <span className="available-label">Available</span>

              <img
                src={hall.imageURL || hall1}
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
          ))
        )}
      </div>
    </div>
  );
}

export default Halls;