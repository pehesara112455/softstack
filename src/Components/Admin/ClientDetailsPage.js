import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // adjust path as needed
import { collection, getDocs } from 'firebase/firestore';
import '../../Styles/Adminstyles/ClientDetailsPageStyle.css';
import AdminNav from './AdminNav';

function ClientDetailsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch clients from Firestore
  useEffect(() => {
    async function fetchClients() {
      const snapshot = await getDocs(collection(db, 'client-details'));
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchClients();
  }, []);

  // Filter clients by search term
  const filteredClients = clients.filter(
    c =>
      c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-details-layout">
      {/* --- Sidebar --- */}
      <AdminNav/>
      {/* --- Main Content --- */}
      <main className="client-details-main">
        <h2>CLIENT DETAILS</h2>
        <div className="top-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search-btn">
              <span role="img" aria-label="search">🔍</span>
            </button>
          </div>
          <button className="add-new-btn">ADD NEW</button>
        </div>
        <table className="client-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact Person Name</th>
              <th>Contact Number</th>
              <th>NIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.companyName}</td>
                <td>{client.contactNumber}</td>
                <td>{client.address}</td>
                <td>{client.email}</td>
                <td>{client.contactPerson}</td>
                <td>{client.personContactNumber}</td>
                <td>{client.nic}</td>
                <td>
                  <button className="action-btn edit-btn" title="Edit">
                    <span role="img" aria-label="edit">✏️</span>
                  </button>
                  <button className="action-btn delete-btn" title="Delete">
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr><td colSpan="8" className="empty-row">No clients found.</td></tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ClientDetailsPage;
