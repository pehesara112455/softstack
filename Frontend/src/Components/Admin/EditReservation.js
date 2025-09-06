import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AddRoomModal from './AddRoomModal';
import AddMealModal from './AddMealModal';
import AddItemModal from './AddItemModal';
import AdminNav from './AdminNav';
import '../../Styles/Adminstyles/EditReservationStyle.css';

function EditReservation() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal and edit indices states
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const [editRoomIdx, setEditRoomIdx] = useState(-1);
  const [editMealIdx, setEditMealIdx] = useState(-1);
  const [editItemIdx, setEditItemIdx] = useState(-1);

  useEffect(() => {
    async function fetchReservation() {
      if (!reservationId) {
        setError('Missing reservation ID in route.');
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'reservations', reservationId));
        if (snap.exists()) {
          setReservation({ id: snap.id, ...snap.data() });
        } else {
          setError('Reservation not found.');
        }
      } catch (err) {
        setError('Error fetching reservation: ' + err.message);
        setReservation(null);
      }
      setLoading(false);
    }
    fetchReservation();
  }, [reservationId]);

  // Add or update handlers
  const handleAddOrUpdateRoom = (room) => {
    setReservation(prev => {
      const rooms = [...(prev.rooms || [])];
      if (editRoomIdx >= 0) rooms[editRoomIdx] = room;
      else rooms.push(room);
      return { ...prev, rooms };
    });
    setShowRoomModal(false);
    setEditRoomIdx(-1);
  };

  const handleAddOrUpdateMeal = (meal) => {
    setReservation(prev => {
      const meals = [...(prev.meals || [])];
      if (editMealIdx >= 0) meals[editMealIdx] = meal;
      else meals.push(meal);
      return { ...prev, meals };
    });
    setShowMealModal(false);
    setEditMealIdx(-1);
  };

  const handleAddOrUpdateItem = (item) => {
    setReservation(prev => {
      const items = [...(prev.items || [])];
      if (editItemIdx >= 0) items[editItemIdx] = item;
      else items.push(item);
      return { ...prev, items };
    });
    setShowItemModal(false);
    setEditItemIdx(-1);
  };

  // Delete handlers
  const handleDeleteRoom = idx => {
    setReservation(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== idx)
    }));
  };

  const handleDeleteMeal = idx => {
    setReservation(prev => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== idx)
    }));
  };

  const handleDeleteItem = idx => {
    setReservation(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  };

  // Calculate total amounts
  const totalRooms = (reservation?.rooms || []).reduce((total, r) => total + (r.qty * r.perUnit + Number(r.extraAmount || 0)), 0);
  const totalMeals = (reservation?.meals || []).reduce((total, m) => total + (m.qty * m.amount), 0);
  const totalItems = (reservation?.items || []).reduce((total, i) => total + Number(i.amount), 0);
  const totalAmount = totalRooms + totalMeals + totalItems;

  // Update Firestore
  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'reservations', reservationId), {
        ...reservation,
        totalAmount
      });
      alert('Reservation updated!');
      navigate('/reservation'); // Change as needed
    } catch (err) {
      alert('Error updating reservation: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red', fontWeight: 'bold'}}>{error}</div>;
  if (!reservation) return <div>Reservation not found.</div>;

  return (
    <div className="edit-res-layout">
      <AdminNav />
      <main className="edit-res-main">
        <h2>ADMIN - EDIT RESERVATION</h2>

        <div className="form-row">
          <label>Res-ID</label>
          <input value={reservation.id || ''} disabled />
        </div>

        <section>
          <b>CLIENT DETAILS</b>
          <div className="form-row">
            <label>Company Name</label>
            <input
              value={reservation.client?.companyName || ''}
              onChange={e =>
                setReservation(prev => ({
                  ...prev,
                  client: { ...prev.client, companyName: e.target.value }
                }))}
            />
            <label>Contact</label>
            <input
              value={reservation.client?.contact || ''}
              onChange={e =>
                setReservation(prev => ({
                  ...prev,
                  client: { ...prev.client, contact: e.target.value }
                }))}
            />
          </div>
          <div className="form-row">
            <label>Date From</label>
            <input
              type="date"
              value={reservation.client?.dateFrom || ''}
              onChange={e =>
                setReservation(prev => ({
                  ...prev,
                  client: { ...prev.client, dateFrom: e.target.value }
                }))}
            />
            <label>Date To</label>
            <input
              type="date"
              value={reservation.client?.dateTo || ''}
              onChange={e =>
                setReservation(prev => ({
                  ...prev,
                  client: { ...prev.client, dateTo: e.target.value }
                }))}
            />
          </div>
        </section>

        <hr className="section-divider" />

        <section>
          <b>ROOMS AND HALLS</b>
          <button className="add-btn" onClick={() => { setEditRoomIdx(-1); setShowRoomModal(true); }}>
            Add
          </button>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Room/Hall</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Extra Hours</th>
                <th>Extra Amount</th>
                <th>Per Unit</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(reservation.rooms || []).map((r, idx) => (
                <tr key={idx}>
                  <td>{r.room}</td>
                  <td>{r.type}</td>
                  <td>{r.qty}</td>
                  <td>{r.extraHours}</td>
                  <td>{r.extraAmount}</td>
                  <td>{r.perUnit}</td>
                  <td>{r.qty * r.perUnit + Number(r.extraAmount || 0)}</td>
                  <td>
                    <button className="action-btn edit-btn" title="Edit room" type="button"
                            onClick={() => { setEditRoomIdx(idx); setShowRoomModal(true); }}>
                      ✏️
                    </button>
                    <button className="action-btn delete-btn" title="Delete" type="button"
                            onClick={() => handleDeleteRoom(idx)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <hr className="section-divider" />

        <section>
          <b>MEALS</b>
          <button className="add-btn" onClick={() => { setEditMealIdx(-1); setShowMealModal(true); }}>
            Add
          </button>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(reservation.meals || []).map((m, idx) => (
                <tr key={idx}>
                  <td>{m.meal}</td>
                  <td>{m.description}</td>
                  <td>{m.qty}</td>
                  <td>{m.qty * m.amount}</td>
                  <td>
                    <button className="action-btn edit-btn" title="Edit meal" type="button"
                            onClick={() => { setEditMealIdx(idx); setShowMealModal(true); }}>
                      ✏️
                    </button>
                    <button className="action-btn delete-btn" title="Delete" type="button"
                            onClick={() => handleDeleteMeal(idx)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <hr className="section-divider" />

        <section>
          <b>OTHER ITEMS</b>
          <button className="add-btn" onClick={() => { setEditItemIdx(-1); setShowItemModal(true); }}>
            Add
          </button>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(reservation.items || []).map((i, idx) => (
                <tr key={idx}>
                  <td>{i.item}</td>
                  <td>{i.description}</td>
                  <td>{i.amount}</td>
                  <td>
                    <button className="action-btn edit-btn" title="Edit item" type="button"
                            onClick={() => { setEditItemIdx(idx); setShowItemModal(true); }}>
                      ✏️
                    </button>
                    <button className="action-btn delete-btn" title="Delete" type="button"
                            onClick={() => handleDeleteItem(idx)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="step-btn-row">
          <button className="next-btn" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="calc-btn" type="button" onClick={() => alert('Total Amount: ' + totalAmount)}>
            Calculate
          </button>
          <button className="submit-btn" type="button" onClick={handleUpdate}>
            Update Reservation
          </button>
        </div>
      </main>

      {showRoomModal && (
        <AddRoomModal
          initialData={editRoomIdx >= 0 ? reservation.rooms[editRoomIdx] : null}
          onClose={() => setShowRoomModal(false)}
          onSubmit={handleAddOrUpdateRoom}
        />
      )}

      {showMealModal && (
        <AddMealModal
          initialData={editMealIdx >= 0 ? reservation.meals[editMealIdx] : null}
          onClose={() => setShowMealModal(false)}
          onSubmit={handleAddOrUpdateMeal}
        />
      )}

      {showItemModal && (
        <AddItemModal
          initialData={editItemIdx >= 0 ? reservation.items[editItemIdx] : null}
          onClose={() => setShowItemModal(false)}
          onSubmit={handleAddOrUpdateItem}
        />
      )}

    </div>
  );
}

export default EditReservation;
