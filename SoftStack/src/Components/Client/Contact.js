import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../Styles/ClientStyles/Contact.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; 

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      
      <div className="contact-header-section">
        <h1>GET IN TOUCH</h1>
        <p>Ready to discuss your event? We are here to help you plan the perfect occasion</p>
        <a href="tel:0112789459" className="call-button">CALL NOW</a>
      </div>

      
      <div className="receipts-section">
        <a href="#" className="receipt-button">
          Payment Receipts Sending &gt;
        </a>
        <p className="receipt-desc">
          Please find attached the receipt for the advance payment made. This confirms that we have received the amount as agreed.
        </p>

        <a href="mailto:cec@sltnet.lk?subject=Donation for Upcoming Projects" className="receipt-button">
          Donation Receipts Sending &gt;
        </a>
        <p className="receipt-desc">
          Support us by donating for our upcoming projects
        </p>
      </div>

      
      <div className="contact-info-section">

        
        <div className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <p>No.117, Thalahena,</p>
            <p>Malabe, Sri Lanka</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <p>cec@sltnet.lk</p>
            <p>cecntc13@gmail.com</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <p>0112 789 459</p>
            <p>0777 666 272</p>
          </div>
        </div>


        <div className="map-business-section">
          <iframe
            title="CEC Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8246037440604!2d79.94820567482247!3d6.911564493087923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2573a9abafe93%3A0x40e9ecbdc8eddc56!2sCommunity%20Education%20Centre!5e0!3m2!1sen!2slk!4v1758214441865!5m2!1sen!2slk"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="business-hours">
            <h3>Business Hours</h3>
            <p>Monday - Saturday: 8.00 AM - 5.00 PM</p>
            <p>Sunday: Holiday</p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Contact;