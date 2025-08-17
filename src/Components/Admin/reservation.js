import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import '../../Styles/Adminstyles/Reservationstyle.css';
import AdminNav from './AdminNav';

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [editingAdvanceId, setEditingAdvanceId] = useState(null);
  const [editingAdvanceValue, setEditingAdvanceValue] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');

  // Fetch reservations
  useEffect(() => {
    fetchReservations();
  }, []);
  const fetchReservations = async () => {
    const snap = await getDocs(collection(db, 'reservations'));
    setReservations(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Advance editing and saving (inline)
  const handleAdvanceEdit = (id, value) => {
    setEditingAdvanceId(id);
    setEditingAdvanceValue(value);
  };
  const handleAdvanceBlur = async (id) => {
    await updateDoc(doc(db, 'reservations', id), { advance: Number(editingAdvanceValue) });
    setEditingAdvanceId(null);
    fetchReservations();
  };

  // Status editing and saving (inline)
  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, 'reservations', id), { status: newStatus });
    fetchReservations();
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'reservations', id));
    fetchReservations();
  };

  // Edit
  const handleEdit = (id) => {
    alert(`Edit reservation: ${id}`);
  };

  // View as PDF (placeholder)
  const handleViewPDF = (r) => {
    alert(`View reservation as PDF: ${r.id}`);
  };

  // Filter and Search
  const filteredReservations = reservations.filter(r =>
    r.status === filterStatus &&
    (search === '' || (r.client?.companyName ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-layout">
      {/* Left Side */}
      <AdminNav />

      {/* Right Side */}
      <div className="reservation-container">
        <h2>RESERVATIONS</h2>
        <div className="reservation-actions">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="reservation-search"
          />
          <button className="add-btn">+ ADD NEW</button>
        </div>

        <table className="reservation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Advance</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.client?.companyName}</td>
                <td>{r.client?.contact}</td>
                <td>{r.client?.dateFrom} - {r.client?.dateTo}</td>
                <td>
                  {editingAdvanceId === r.id ? (
                    <input
                      className="advance-input"
                      type="number"
                      value={editingAdvanceValue}
                      onChange={e => setEditingAdvanceValue(e.target.value)}
                      onBlur={() => handleAdvanceBlur(r.id)}
                      autoFocus
                    />
                  ) : (
                    <input
                      className="advance-input"
                      type="number"
                      value={r.advance || ''}
                      onFocus={() => handleAdvanceEdit(r.id, r.advance || '')}
                      readOnly
                    />
                  )}
                </td>
                <td>{r.totalAmount}</td>
                <td>
                  <select
                    value={r.status}
                    onChange={e => handleStatusChange(r.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="action-cell">
                  <button
                    className="action-btn edit-btn"
                    title="Edit"
                    onClick={() => handleEdit(r.id)}>✏️</button>
                  <button
                    className="action-btn delete-btn"
                    title="Delete"
                    onClick={() => handleDelete(r.id)}>🗑️</button>
                  <button
                    className="action-btn pdf-btn"
                    title="View as PDF"
                    onClick={() => handleViewPDF(r)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Reservation;
