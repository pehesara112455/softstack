import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // ✅ your firebase.js
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../Styles/ClientStyles/Programs.css";

function Programs() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const programsToShow = programs.filter(
    (program) => program.status === activeTab
  );

  return (
    <div className="programs-container">
      <Navbar />

      {/* Main content wrapper to handle flex:1 */}
      <div className="main-content">
        {/* Tabs */}
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

        {/* Donation Button */}
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
          {programsToShow.map((program) => (
            <div key={program.id} className="program-card">
              <div className="card-left">
                {program.thumbnail ? (
                  <img
                    src={program.thumbnail}
                    alt={program.title}
                    className="program-img"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="default"
                    className="program-img"
                  />
                )}
              </div>
              <div className="card-right">
                <h2 className="program-title">{program.title}</h2>
                <h3 className="program-subtopic">{program.subTitle}</h3>
                <p className="program-description">{program.paragraph1}</p>
                <p className="program-description">{program.paragraph2}</p>
                <p className="program-description">{program.paragraph3}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Programs;
