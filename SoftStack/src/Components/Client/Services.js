import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../Styles/ClientStyles/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching services from Firestore...");
        const querySnapshot = await getDocs(collection(db, "services"));
        console.log("Query snapshot:", querySnapshot);
        console.log("Number of documents:", querySnapshot.docs.length);
        
        const data = querySnapshot.docs.map((doc) => {
          const docData = { id: doc.id, ...doc.data() };
          console.log("Service data:", docData);
          return docData;
        });
        
        console.log("All services data:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Add debugging logs
  console.log("Component state:", { services, loading, error });

  if (loading) {
    return (
      <div className="services-container">
        <Navbar />
        <div className="main-content">
          <p className="loading">Loading services...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-container">
        <Navbar />
        <div className="main-content">
          <p className="no-data">Error loading services: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="services-container">
      <Navbar />
      <div className="main-content">
        {services.length === 0 ? (
          <p className="no-data">No services available.</p>
        ) : (
          <>
            <h3 style={{
              color: '#7F0404',
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '2.5em'
            }}>
              Our Services
            </h3>
            {services.map((service, index) => {
              console.log(`Rendering service ${index}:`, service);
              return (
                <div key={service.id || index} className="service-card">
                  <div className="card-left">
                    <img
                      src={service.image1 || service.image || "https://via.placeholder.com/400x200?text=Service+Image"}
                      alt={service.title || service.name || "Service"}
                      className="service-img"
                      onError={(e) => {
                        console.log("Image load error:", e);
                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                      onLoad={() => console.log("Image loaded successfully")}
                    />
                  </div>
                  <div className="card-right">
                    <h2 className="service-topic">
                      {service.title || service.name || "Untitled Service"}
                    </h2>
                    <p className="service-description">
                      {service.description || "No description available."}
                    </p>
                    {service.image2 && (
                      <img
                        src={service.image2}
                        alt={`${service.title || service.name} secondary`}
                        className="service-img-secondary"
                        onError={(e) => {
                          console.log("Secondary image error:", e);
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    {service.image3 && (
                      <img
                        src={service.image3}
                        alt={`${service.title || service.name} third`}
                        className="service-img-secondary"
                        onError={(e) => {
                          console.log("Third image error:", e);
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Services;