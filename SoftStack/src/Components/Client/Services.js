import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // your firebase.js
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../Styles/ClientStyles/Services.css";
import ServicesImg from "../../Resousers/services.png"; 

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;

  return (
    <div className="services-container">
      <Navbar />

      <div className="main-content">
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="card-left">
                <img
                  src={service.image1 || "https://via.placeholder.com/300x200"}
                  alt={service.title || "Service"}
                  className="service-img"
                />
              </div>

              <div className="card-right">
                <h2 className="service-topic">{service.title || "Untitled Service"}</h2>
                <p className="service-description">{service.description || ""}</p>

                {service.image2 && (
                  <img
                    src={service.image2}
                    alt={`${service.title} secondary`}
                    className="service-img"
                  />
                )}
                {service.image3 && (
                  <img
                    src={service.image3}
                    alt={`${service.title} third`}
                    className="service-img"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Services;
