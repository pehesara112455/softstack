import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query ,onSnapshot} from 'firebase/firestore';
import '../../Styles/Adminstyles/Reservationstyle.css';
import AdminNav from './AdminNav';
import AddReservation from './AddReservation';
// import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Reservation() {
  // State declarations
  const [reservations, setReservations] = useState([]);
  const [editingAdvanceId, setEditingAdvanceId] = useState(null);
  const [editingAdvanceValue, setEditingAdvanceValue] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [showAdd, setShowAdd] = useState(false);

  // Fetch reservations on mount
useEffect(() => {
  const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, []);


  const fetchReservations = async () => {
  const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  setReservations(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
};

  // Inline advance editing and saving
  const handleAdvanceEdit = (id, value) => {
    setEditingAdvanceId(id);
    setEditingAdvanceValue(value);
  };

  const handleAdvanceBlur = async (id) => {
    if (editingAdvanceValue === '') {
      setEditingAdvanceId(null);
      return;
    }
    await updateDoc(doc(db, 'reservations', id), { advance: Number(editingAdvanceValue) });
    setEditingAdvanceId(null);
    fetchReservations();
  };

  // Inline status editing and saving
  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, 'reservations', id), { status: newStatus });
    fetchReservations();
  };

  // Delete reservation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      await deleteDoc(doc(db, 'reservations', id));
      fetchReservations();
    }
  };

  // Edit placeholder
const navigate = useNavigate();

const handleEdit = (id) => {
  // Replace alert with navigation
  navigate(`/EditReservation/${id}`);
};


  // View as PDF placeholder
  const handleViewPDF = (r) => {
    alert(`View reservation as PDF: ${r.id}`);
    // Implement PDF export functionality here
  };

  // Filter and search reservations
  const filteredReservations = reservations.filter(r =>
    r.status === filterStatus &&
    (search === '' || (r.client?.companyName ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminNav />

      {/* Main content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {showAdd ? (
          <AddReservation onClose={() => {
            setShowAdd(false);
            fetchReservations();
          }} />
        ) : (
          <>
            <h2 style={{ color: '#7a1818', marginBottom: '1.5rem' }}>RESERVATIONS</h2>

            <div className="reservation-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '0.5rem', borderRadius: '5px' }}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                style={{ padding: '0.5rem', flexGrow: 1, borderRadius: '5px', border: '1px solid #ccc' }}
              />

              <button className="add-btn" onClick={() => setShowAdd(true)} style={{
                backgroundColor: '#7a1818',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                + ADD NEW
              </button>
            </div>

            <table className="reservation-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                  <tr key={r.id} style={{ borderBottom: '1.5px solid #eaeaea' }}>
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
                          style={{ width: '80px', padding: '0.25rem' }}
                        />
                      ) : (
                        <input
                          className="advance-input"
                          type="number"
                          value={r.advance || ''}
                          onFocus={() => handleAdvanceEdit(r.id, r.advance || '')}
                          readOnly
                          style={{ width: '80px', border: 'none', background: 'transparent', textAlign: 'center' }}
                        />
                      )}
                    </td>
                    <td>{r.totalAmount}</td>
                    <td>
                      <select
                        value={r.status}
                        onChange={e => handleStatusChange(r.id, e.target.value)}
                        className="status-select"
                        style={{ padding: '0.25rem', borderRadius: '4px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="action-cell" style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
  type="button"
  className="action-btn edit-btn"
  aria-label="Edit row"
  title="Edit"
  onClick={() => handleEdit(r.id)}
>
  <span role="img" style={{ fontSize: '1.2em' }}>✏️</span>
</button>


                      <button
                        className="action-btn delete-btn"
                        title="Delete"
                        onClick={() => handleDelete(r.id)}
                        style={{ cursor: 'pointer' }}
                      >🗑️</button>
                      <button
                        className="action-btn pdf-btn"
                        title="View as PDF"
                        onClick={() => handleViewPDF(r)}
                        style={{ cursor: 'pointer' }}
                      >View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Reservation;
