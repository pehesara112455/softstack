import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import AdminNav from "./AdminNav";
import AddDonationForm from "./AddDonationForm";
import "../../Styles/Adminstyles/Donations.css";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);

  // 🔹 pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
      setDonations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      await deleteDoc(doc(db, "donations", id));
    }
  };

  const handleEdit = (id) => {
    const donationToEdit = donations.find((donation) => donation.id === id);
    if (donationToEdit) {
      setEditingDonation(donationToEdit);
      setShowForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDonation(null);
  };

  const handleAddNew = () => {
    setEditingDonation(null);
    setShowForm(true);
  };

  // 🔹 filter + sort (recent first)
  const filteredDonations = donations
    .filter(
      (d) =>
        search === "" ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 🔹 pagination slice
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentDonations = filteredDonations.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredDonations.length / rowsPerPage);

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="content-container">
        <section className="section-container">
          <h2 className="section-title">DONATION DETAILS</h2>
          <div className="actions-row">
            <input
              type="search"
              value={search}
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset to first page when searching
              }}
              className="search-input"
            />
            <button className="add-btn" onClick={handleAddNew}>
              ADD NEW
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.length > 0 ? (
                currentDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.name}</td>
                    <td>{donation.country}</td>
                    <td>{donation.contact}</td>
                    <td>{donation.date}</td>
                    <td>{donation.amount}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(donation.id)}
                        className="action-btn edit-btn"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(donation.id)}
                        className="action-btn delete-btn"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No donations found
                  </td>
                </tr>
              )}              
            </tbody>
          </table>

          {/* 🔹 Pagination Controls */}
          {filteredDonations.length > rowsPerPage && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ← 
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                 →
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Modal for Add/Edit Donation */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddDonationForm
              onClose={handleCloseForm}
              editingDonation={editingDonation}
            />
            <button className="close-btn" onClick={handleCloseForm}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donations;
