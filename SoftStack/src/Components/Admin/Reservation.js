import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import '../../Styles/Adminstyles/Reservationstyle.css';
import AdminNav from './AdminNav';
import AddReservation from './AddReservation';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


function Reservation() {
  // State declarations
  const [reservations, setReservations] = useState([]);
  const [editingAdvanceId, setEditingAdvanceId] = useState(null);
  const [editingAdvanceValue, setEditingAdvanceValue] = useState('');
  const [search, setSearch] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
 
  const navigate = useNavigate();

  // Fetch reservations on mount with real-time updates
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


  // Navigate to edit reservation page
  const handleEdit = (id) => {
    navigate(`/EditReservation/${id}`);
  };

  // View reservation as PDF invoice
  const handleView = async (id) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      generatePDFInvoice(reservation);
    } else {
      alert('Reservation data not found');
    }
  };



function generatePDFInvoice(reservation) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const marginLeft = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginRight = pageWidth - 40;
  let y = 40;

  // Company Info
  doc.setFontSize(18);
  doc.setTextColor('#7a1818');
  doc.text("Community Education Centre (CEC)", marginLeft, y);
  y += 20;

  doc.setFontSize(10);
  doc.setTextColor('#555555');
  doc.text("123 Business Street, Thalahena, Sri lanka", marginLeft, y);
  y += 15;
  doc.text("Phone:  0112 789 459 / 0777 666 272 | Email: cec@sltnet.lk / cecntc13@gmail.com ", marginLeft, y);
  y += 30;

  // Invoice Header (right aligned)
  doc.setFontSize(22);
  doc.setTextColor('#000000');
  doc.text("INVOICE", marginRight, y, { align: 'right' });
  y += 25;

  doc.setFontSize(10);
  doc.text(`Invoice #: ${reservation.id}`, marginRight, y, { align: 'right' });
  y += 15;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, marginRight, y, { align: 'right' });
  y += 30;

  // Customer Info Box
  doc.setFillColor('#7a1818');
  doc.setTextColor('#fff');
  doc.setFontSize(14);
  doc.rect(marginLeft, y, 120, 20, 'F'); // Filled rectangle for "Bill To:"
  doc.text("Bill To:", marginLeft + 5, y + 15);

  doc.setFontSize(11);
  doc.setTextColor('#000');
  y += 35;
  doc.text(reservation.client?.companyName || "N/A", marginLeft, y);
  y += 15;
  doc.text(reservation.client?.contact || "N/A", marginLeft, y);
  y += 25;

  // Helper Function to Add Tables
  function addTable(title, headers, body) {
    doc.setFontSize(14);
    doc.setTextColor('#7a1818');
    doc.text(title, marginLeft, y);
    y += 15;

    autoTable(doc, {
      startY: y,
      head: [headers],
      body: body,
      theme: 'grid',
      headStyles: { fillColor: '#7a1818', textColor: '#fff', fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { left: marginLeft, right: marginLeft },
      tableWidth: pageWidth - 2 * marginLeft,
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 90 },
        2: { cellWidth: 80 },
        3: { cellWidth: 60 },
        4: { cellWidth: 60 },
        5: { cellWidth: 60 },
        6: { cellWidth: 60 },
        7: { cellWidth: 60 },
      }
    });

    y = doc.lastAutoTable.finalY + 25; // increased space to next table or content
  }

  // Rooms & Halls Table
  if (reservation.rooms?.length) {
    const body = reservation.rooms.map((r, i) => [
      i + 1,
      r.room,
      r.type,
      r.qty,
      r.extraHours,
      Number(r.extraAmount).toFixed(2),
      Number(r.perUnit).toFixed(2),
      (r.qty * r.perUnit + Number(r.extraAmount || 0)).toFixed(2)
    ]);
    addTable("Rooms & Halls", ["#", "Room/Hall", "Type", "Qty", "Extra Hrs", "Extra Amt", "Per Unit", "Total"], body);
  }

  // Meals Table
  if (reservation.meals?.length) {
    const body = reservation.meals.map((m, i) => [
      i + 1,
      m.meal,
      m.description,
      m.qty,
      Number(m.amount).toFixed(2),
      (m.qty * m.amount).toFixed(2)
    ]);
    addTable("Meals", ["#", "Meal", "Description", "Qty", "Amount", "Total"], body);
  }

  // Other Items Table
  if (reservation.items?.length) {
    const body = reservation.items.map((i, idx) => [
      idx + 1,
      i.item,
      i.description,
      Number(i.amount).toFixed(2),
    ]);
    addTable("Other Items", ["#", "Item", "Description", "Amount"], body);
  }

  // Totals Section
  const subtotalRooms = reservation.rooms?.reduce((sum, r) => sum + (r.qty * r.perUnit + Number(r.extraAmount || 0)), 0) || 0;
  const subtotalMeals = reservation.meals?.reduce((sum, m) => sum + (m.qty * m.amount), 0) || 0;
  const subtotalItems = reservation.items?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
  const subtotal = subtotalRooms + subtotalMeals + subtotalItems;
  const advance = reservation.advance || 0;
  const balance = subtotal - advance;

  let xLabel = pageWidth - 200;
  let xValue = pageWidth - 40;

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor('#000');
  doc.text("Subtotal:", xLabel, y);
  doc.text(subtotal.toFixed(2), xValue, y, { align: "right" });
  y += 18;
  doc.text("Advance Payment:", xLabel, y);
  doc.text(advance.toFixed(2), xValue, y, { align: "right" });
  y += 18;

  doc.setFontSize(14);
  doc.setTextColor('#7a1818');
  doc.text("Balance Due:", xLabel, y);
  doc.text(balance.toFixed(2), xValue, y, { align: "right" });
  y += 40;

  // Signature lines
  const signLineLength = 200;
  const signY = y;
  const signLeftX = marginLeft;
  const signRightX = pageWidth - marginLeft - signLineLength;

  doc.setDrawColor('#7a1818');
  doc.setLineWidth(0.8);
  doc.line(signLeftX, signY, signLeftX + signLineLength, signY);
  doc.line(signRightX, signY, signRightX + signLineLength, signY);

  doc.setFontSize(11);
  doc.setTextColor('#333');
  doc.text("Client Signature", signLeftX, signY + 15);
  doc.text("Authorized Signature", signRightX, signY + 15);

  // Footer
  const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  doc.setFontSize(10);
  doc.setTextColor('#999');
  doc.text("Thank you!", pageWidth / 2, pageHeight - 40, null, null, 'center');
  doc.text(`Invoice generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 25, null, null, 'center');

  // Save the PDF file
  doc.save(`invoice_${reservation.id}.pdf`);
}

  // Filter and search reservations
 const filteredReservations = reservations.filter(r =>
  (filterStatus === 'all' || r.status === filterStatus) &&
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


            <div className="reservation-actions" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <select
  value={filterStatus}
  onChange={e => setFilterStatus(e.target.value)}
  style={{ padding: '0.5rem', borderRadius: '5px' }}
>
  <option value="all">All</option>
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

                      >
                        🗑️
                      </button>

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
