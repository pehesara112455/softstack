import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../Styles/Adminstyles/AddReservationstyle.css';
import { getDateList } from '../../utils/getDateList'; // Adjust path as needed
import AddClient from './AddClient';

function AddReservation({ onClose }) {
  // Step switching
  const [step, setStep] = useState(1);

  // Client form state
  const [client, setClient] = useState({ companyName: '', contact: '', dateFrom: '', dateTo: '' });

  // Rooms form state (note newRoom has dateFrom, dateTo)
  const [roomList, setRoomList] = useState([]);
  const [newRoom, setNewRoom] = useState({ room: '', type: '', qty: '', perUnit: '', dateFrom: '', dateTo: '' });

  const [showClientModal, setShowClientModal] = useState(false);

  // Meals form state
  const [mealList, setMealList] = useState([]);
  const [newMeal, setNewMeal] = useState({ meal: '', description: '', qty: '', amount: '' });

  // Other items form state
  const [itemList, setItemList] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', description: '', amount: '' });

  // Utility functions for adding/removing
  const addRoom = () => {
    if (
      !newRoom.room ||
      !newRoom.type ||
      !newRoom.qty ||
      !newRoom.perUnit ||
      !newRoom.dateFrom ||
      !newRoom.dateTo
    ) return;
    const dates = getDateList(newRoom.dateFrom, newRoom.dateTo);
    setRoomList([...roomList, { ...newRoom, dates }]);
    setNewRoom({ room: '', type: '', qty: '', perUnit: '', dateFrom: '', dateTo: '' });
  };
  const removeRoom = idx => setRoomList(roomList.filter((_, i) => i !== idx));

  const addMeal = () => {
    if (!newMeal.meal || !newMeal.qty || !newMeal.amount) return;
    setMealList([...mealList, { ...newMeal }]);
    setNewMeal({ meal: '', description: '', qty: '', amount: '' });
  };
  const removeMeal = idx => setMealList(mealList.filter((_, i) => i !== idx));

  const addItem = () => {
    if (!newItem.item || !newItem.amount) return;
    setItemList([...itemList, { ...newItem }]);
    setNewItem({ item: '', description: '', amount: '' });
  };
  const removeItem = idx => setItemList(itemList.filter((_, i) => i !== idx));

  // Total calculation (no change)
  const totalRooms = roomList.reduce((sum, r) => sum + (r.qty * r.perUnit), 0);
  const totalMeals = mealList.reduce((sum, m) => sum + (m.qty * m.amount), 0);
  const totalItems = itemList.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalAmount = totalRooms + totalMeals + totalItems;

  // Submit Reservation
  const handleSubmit = async () => {
    await addDoc(collection(db, 'reservations'), {
      client,
      rooms: roomList,
      meals: mealList,
      items: itemList,
      totalAmount,
      status: 'pending'
    });
    if (onClose) onClose();
  };

  

  return (
    <div className="add-reservation-layout">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="add-reservation-form">
          <h2>CLIENT DETAILS</h2>
          <div className="form-row">
            <label>Company Name</label>
            <input
              type="text"
              value={client.companyName}
              onChange={e => setClient({ ...client, companyName: e.target.value })}
            />
            {/* Add Client button */}
        <button
          type="button"
          className="add-client-btn"
          onClick={() => setShowClientModal(true)}
        >
          Add Client
        </button>
            <label>Contact</label>
            <input
              type="text"
              value={client.contact}
              onChange={e => setClient({ ...client, contact: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>Date - From</label>
            <input
              type="date"
              value={client.dateFrom}
              onChange={e => setClient({ ...client, dateFrom: e.target.value })}
            />
            <label>Date - To</label>
            <input
              type="date"
              value={client.dateTo}
              onChange={e => setClient({ ...client, dateTo: e.target.value })}
            />
          </div>
          <hr className="section-divider" />

          <h2>ROOMS AND HALLS</h2>
          <div className="form-row">
            <input
              placeholder="Room / Hall"
              value={newRoom.room}
              onChange={e => setNewRoom({ ...newRoom, room: e.target.value })}
            />
            <input
              placeholder="Type"
              value={newRoom.type}
              onChange={e => setNewRoom({ ...newRoom, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newRoom.qty}
              onChange={e => setNewRoom({ ...newRoom, qty: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Per Unit"
              value={newRoom.perUnit}
              onChange={e => setNewRoom({ ...newRoom, perUnit: Number(e.target.value) })}
            />
            <input
              type="date"
              placeholder="From"
              value={newRoom.dateFrom}
              onChange={e => setNewRoom({ ...newRoom, dateFrom: e.target.value })}
            />
            <input
              type="date"
              placeholder="To"
              value={newRoom.dateTo}
              onChange={e => setNewRoom({ ...newRoom, dateTo: e.target.value })}
            />
            <button className="add-btn" type="button" onClick={addRoom}>+</button>
          </div>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Room/Hall</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Per Unit</th>
                <th>Total Amount</th>
                <th>Date Range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roomList.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.room}</td>
                  <td>{r.type}</td>
                  <td>{r.qty}</td>
                  <td>{r.perUnit}</td>
                  <td>{r.qty * r.perUnit}</td>
                  <td>{r.dateFrom} - {r.dateTo}</td>
                  <td><button type="button" className="del-btn" onClick={() => removeRoom(idx)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="step-btn-row">
            <button className="next-btn" type="button" onClick={() => setStep(2)}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="add-reservation-form">
          <h2>MEALS</h2>
          <div className="form-row">
            <input
              placeholder="Meal"
              value={newMeal.meal}
              onChange={e => setNewMeal({ ...newMeal, meal: e.target.value })}
            />
            <input
              placeholder="Description"
              value={newMeal.description}
              onChange={e => setNewMeal({ ...newMeal, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newMeal.qty}
              onChange={e => setNewMeal({ ...newMeal, qty: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newMeal.amount}
              onChange={e => setNewMeal({ ...newMeal, amount: Number(e.target.value) })}
            />
            <button className="add-btn" type="button" onClick={addMeal}>+</button>
          </div>
          <table className="summary-table">
            <thead>
              <tr><th>Meal</th><th>Description</th><th>Qty</th><th>Total Amount</th><th></th></tr>
            </thead>
            <tbody>
              {mealList.map((m, idx) => (
                <tr key={idx}>
                  <td>{m.meal}</td>
                  <td>{m.description}</td>
                  <td>{m.qty}</td>
                  <td>{m.qty * m.amount}</td>
                  <td><button type="button" className="del-btn" onClick={() => removeMeal(idx)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="section-divider" />
          <h2>OTHER ITEMS</h2>
          <div className="form-row">
            <input
              placeholder="Item"
              value={newItem.item}
              onChange={e => setNewItem({ ...newItem, item: e.target.value })}
            />
            <input
              placeholder="Description"
              value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newItem.amount}
              onChange={e => setNewItem({ ...newItem, amount: Number(e.target.value) })}
            />
            <button className="add-btn" type="button" onClick={addItem}>+</button>
          </div>
          <table className="summary-table">
            <thead>
              <tr><th>Item</th><th>Description</th><th>Amount</th><th></th></tr>
            </thead>
            <tbody>
              {itemList.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.item}</td>
                  <td>{i.description}</td>
                  <td>{i.amount}</td>
                  <td><button type="button" className="del-btn" onClick={() => removeItem(idx)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="step-btn-row">
            <button className="back-btn" type="button" onClick={() => setStep(1)}>Back</button>
            <button
              className="calc-btn"
              type="button"
              onClick={() => alert('Total Amount: ' + totalAmount)}
            >Calculate</button>
            <button className="submit-btn" type="button" onClick={handleSubmit}>Confirm Reservation</button>
          </div>
        </div>
      )}
       {/* Show the modal if requested */}
      {showClientModal && (
        <AddClient onClose={() => setShowClientModal(false)} />
      )}
    </div>
  );
}

export default AddReservation;
