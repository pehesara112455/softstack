import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import "../../Styles/Adminstyles/Donations.css";

function AddDonationForm({ onClose, editingDonation }) {
  const [donation, setDonation] = useState({
    name: "",
    country: "",
    contact: "",
    date: "",
    amount: "",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editingDonation) {
      setDonation({
        name: editingDonation.name || "",
        country: editingDonation.country || "",
        contact: editingDonation.contact || "",
        date: editingDonation.date || "",
        amount: editingDonation.amount || "",
      });
    }
  }, [editingDonation]);

  const submitDonation = async (e) => {
    e.preventDefault();

    if (!donation.name || !donation.country || !donation.contact || !donation.date || !donation.amount) {
      alert("Please fill all fields before submitting!");
      return;
    }

    try {
      if (editingDonation) {
        // Update existing donation
        await updateDoc(doc(db, "donations", editingDonation.id), {
          ...donation,
          amount: Number(donation.amount),
        });
      } else {
        // Add new donation
        await addDoc(collection(db, "donations"), {
          ...donation,
          amount: Number(donation.amount),
        });
      }

      if (onClose) onClose();
      clearForm();
    } catch (error) {
      console.error("Error saving donation: ", error);
      alert("Something went wrong while saving the donation.");
    }
  };

  const clearForm = () => {
    setDonation({ name: "", country: "", contact: "", date: "", amount: "" });
  };

  return (
    <form className="form-card" onSubmit={submitDonation} noValidate>
      <h2 className="form-title">{editingDonation ? "EDIT DONATION" : "ADD DONATION"}</h2>

      <label>Name</label>
      <input
        type="text"
        value={donation.name}
        onChange={(e) => setDonation({ ...donation, name: e.target.value })}
        required
      />

      <label>Country</label>
      <input
        type="text"
        value={donation.country}
        onChange={(e) => setDonation({ ...donation, country: e.target.value })}
        required
      />

      <label>Contact</label>
      <input
        type="text"
        value={donation.contact}
        onChange={(e) => setDonation({ ...donation, contact: e.target.value })}
        required
      />

      <label>Date</label>
      <input
        type="date"
        value={donation.date}
        onChange={(e) => setDonation({ ...donation, date: e.target.value })}
        required
      />

      <label>Amount</label>
      <input
        type="number"
        value={donation.amount}
        onChange={(e) => setDonation({ ...donation, amount: e.target.value })}
        required
      />

      <div className="form-btn-row">
        <button type="button" className="clear-btn" onClick={clearForm}>
          Clear
        </button>
        <button type="submit" className="submit-btn">
          {editingDonation ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default AddDonationForm;