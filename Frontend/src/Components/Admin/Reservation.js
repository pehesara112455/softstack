import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query ,onSnapshot} from 'firebase/firestore';
import '../../Styles/Adminstyles/Reservationstyle.css';
import AdminNav from './AdminNav';
import AddReservation from './AddReservation';
// import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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


const handleView = async (id) => {
  // Option 1: If you already have reservation in state, use it directly
  const reservation = reservations.find(r => r.id === id);

 

  // Now, generate PDF
  generatePDFInvoice(reservation);
};

function generatePDFInvoice(reservation) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reservation Invoice', 14, 20);

  doc.setFontSize(12);
  doc.text(`Reservation ID: ${reservation.id}`, 14, 32);
  doc.text(`Client Name: ${reservation.client?.companyName || ''}`, 14, 40);
  doc.text(`Contact: ${reservation.client?.contact || ''}`, 14, 46);
  doc.text(`Date: ${reservation.client?.dateFrom || '-'} - ${reservation.client?.dateTo || '-'}`, 14, 52);
  doc.text(`Advance: ${reservation.advance || ''}`, 14, 58);
  doc.text(`Total Amount: ${reservation.totalAmount || ''}`, 14, 64);

  // Prepare table rows for rooms, meals, items
  let yOffset = 70;
  if (reservation.rooms && reservation.rooms.length) {
    doc.setFontSize(14);
    doc.text("Rooms & Halls:", 14, yOffset);
    yOffset += 7;
    doc.setFontSize(11);
    reservation.rooms.forEach((r, i) => {
      doc.text(
        `${i + 1}. ${r.room}, Type: ${r.type}, Qty: ${r.qty}, Per Unit: ${r.perUnit}, Extra Hours: ${r.extraHours}, Extra Amount: ${r.extraAmount}`,
        16,
        yOffset
      );
      yOffset += 7;
    });
  }
  if (reservation.meals && reservation.meals.length) {
    yOffset += 7;
    doc.setFontSize(14);
    doc.text("Meals:", 14, yOffset);
    yOffset += 7;
    doc.setFontSize(11);
    reservation.meals.forEach((m, i) => {
      doc.text(
        `${i + 1}. ${m.meal}, Desc: ${m.description}, Qty: ${m.qty}, Amount: ${m.amount}`,
        16,
        yOffset
      );
      yOffset += 7;
    });
  }
  if (reservation.items && reservation.items.length) {
    yOffset += 7;
    doc.setFontSize(14);
    doc.text("Other Items:", 14, yOffset);
    yOffset += 7;
    doc.setFontSize(11);
    reservation.items.forEach((it, i) => {
      doc.text(
        `${i + 1}. ${it.item}, Desc: ${it.description}, Amount: ${it.amount}`,
        16,
        yOffset
      );
      yOffset += 7;
    });
  }

  doc.save(`invoice_${reservation.id}.pdf`);
}


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
  className="action-btn view-btn"
  type="button"
  onClick={() => handleView(r.id)}
>
  View
</button>




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
