import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../Styles/ClientStyles/Programs.css";
import upcomingImg from "../../Resousers/projects-upcoming.png";
import completedImg from "../../Resousers/projects-completed.png";


function Programs() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingPrograms = [
    {
      title: "World Food Day",
      subtopic: "Honoring Food, Sustainability, and Community Well-being",
      description:
        "The Community Education Centre is pleased to announce that we will be joining the global observance of World Food Day. While specific program details are yet to be finalized, the celebration will focus on raising awareness around food security, sustainable agriculture, and the role of communities in building a healthier future. Stay tuned for more updates!",
      image: upcomingImg,
    },
  ];

  const completedPrograms = [
    {
      title: "Compost-Based Practices",
      subtopic: "Sustainable Waste Management in Dambulla – Degampathaha",
      description:
        "This field visit brought together CEC participants and partner organizations to explore practical approaches to sustainable waste management in Degampathaha, Dambulla. The visit focused on community-led composting methods, organic waste processing, and local innovations in environmental sustainability. Participants engaged in hands-on learning, site observations, and knowledge-sharing with rural waste management stakeholders.",
      image: completedImg,
    },
  ];

  const programsToShow =
    activeTab === "upcoming" ? upcomingPrograms : completedPrograms;

  return (
    <div className="programs-container">
      <Navbar />

      {/* Tab Buttons */}
      <div className="program-tabs">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Programs
        </button>
        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed Programs
        </button>
      </div>

      {/* Donation Button (between tabs and cards) */}
      <div className="donation-container">
        <a
          href="mailto:cec@sltnet.lk?subject=Donation for Upcoming Programs"
          className="donation-button"
        >
          Support Us by Donating
        </a>
      </div>

      {/* Program Cards */}
      <div className="program-cards">
        {programsToShow.map((program, index) => (
          <div key={index} className="program-card">
            <div className="card-left">
              <img src={program.image} alt={program.title} className="program-img" />
            </div>
            <div className="card-right">
              <h2 className="program-title">{program.title}</h2>
              <h3 className="program-subtopic">{program.subtopic}</h3>
              <p className="program-description">{program.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Programs;
