import React from "react";
import Navbar from "./Navbar";   
import Footer from "./Footer";   
import "../../Styles/ClientStyles/Services.css";
import ServicesImg from "../../Resousers/services.png"; 

function Services() {
  return (
    <div className="services-container">
      <Navbar />

      <div className="service-card">
        <div className="card-left">
          <img src={ServicesImg} alt="Preschool Service" className="service-img" />
        </div>

        <div className="card-right">
          <h2 className="service-topic">“Singithi Divihuru Niwasa” Preschool Service</h2>
          <h3 className="service-subtopic">
            Enhancing Early Childhood Education through Community Engagement
          </h3>
          <p className="service-description">
            The Preschool Service Project aims to uplift early childhood education by creating a supportive, engaging, and developmentally appropriate learning environment for preschool-aged children. 
            This initiative involves providing essential learning materials, organizing interactive play-based sessions, and improving classroom infrastructure with the help of volunteers and community support.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Services;
