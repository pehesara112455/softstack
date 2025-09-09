import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import Select from 'react-select';
import '../../Styles/Adminstyles/AddReservationstyle.css';
import { getDateList } from '../../utils/getDateList';
import AddClient from './AddClient';

function AddReservation({ onClose }) {
  // Step control
  const [step, setStep] = useState(1);

  // Client info state
  const [showClientModal, setShowClientModal] = useState(false);
  const [client, setClient] = useState({ companyName: '', contact: '', dateFrom: '', dateTo: '' });
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientOptions, setClientOptions] = useState([]);

  // Rooms and halls options combined
  const [roomOptions, setRoomOptions] = useState([]);

  // New room/hall input
  const [roomList, setRoomList] = useState([]);
  const [newRoom, setNewRoom] = useState({ room: '', type: '', qty: '', perUnit: '', dateFrom: '', dateTo: '' });

  // Meals state
  const [mealList, setMealList] = useState([]);
  const [newMeal, setNewMeal] = useState({ meal: '', description: '', qty: '', amount: '' });

  // Other items state
  const [itemList, setItemList] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', description: '', amount: '' });

  // Fetch clients for searchable dropdown
  useEffect(() => {
    async function fetchClients() {
      try {
        const querySnapshot = await getDocs(collection(db, 'client-details'));
        const options = querySnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().companyName,
          contact: doc.data().contactNumber,
        }));
        setClientOptions(options);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }
    fetchClients();
  }, []);

  // Fetch rooms and halls combined
  useEffect(() => {
    async function fetchRoomsAndHalls() {
      try {
        const roomSnapshot = await getDocs(collection(db, 'rooms'));
        const hallSnapshot = await getDocs(collection(db, 'halls'));
        const rooms = roomSnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().name || `Room ${doc.id}`,
          type: 'Room',
          ...doc.data(),
        }));
        const halls = hallSnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().name || `Hall ${doc.id}`,
          type: 'Hall',
          ...doc.data(),
        }));
        setRoomOptions([...rooms, ...halls]);
      } catch (error) {
        console.error('Error fetching rooms and halls:', error);
      }
    }
    fetchRoomsAndHalls();
  }, []);

  // Handle client select change
  const handleClientChange = selectedOption => {
    setSelectedClient(selectedOption);
    setClient(prevClient => ({
      ...prevClient,
      companyName: selectedOption ? selectedOption.label : '',
      contact: selectedOption ? selectedOption.contact : '',
    }));
  };

  // Add room/hall utility
  const addRoom = () => {
    if (
      !newRoom.dateFrom ||
      !newRoom.dateTo ||
      !newRoom.room ||
      !newRoom.type ||
      !newRoom.qty ||
      !newRoom.perUnit
    ) return;
    const dates = getDateList(newRoom.dateFrom, newRoom.dateTo);
    const selectedOption = roomOptions.find(opt => opt.value === newRoom.room);
    const name = selectedOption ? selectedOption.label : newRoom.room;
    setRoomList([...roomList, { ...newRoom, name, dates }]);
    setNewRoom({ room: '', type: '', qty: '', perUnit: '', dateFrom: '', dateTo: '' });
  };

  const removeRoom = idx => setRoomList(roomList.filter((_, i) => i !== idx));

  // Add meal utility
  const addMeal = () => {
    if (!newMeal.meal || !newMeal.qty || !newMeal.amount) return;
    setMealList([...mealList, { ...newMeal }]);
    setNewMeal({ meal: '', description: '', qty: '', amount: '' });
  };
  const removeMeal = idx => setMealList(mealList.filter((_, i) => i !== idx));

  // Add item utility
  const addItem = () => {
    if (!newItem.item || !newItem.amount) return;
    setItemList([...itemList, { ...newItem }]);
    setNewItem({ item: '', description: '', amount: '' });
  };
  const removeItem = idx => setItemList(itemList.filter((_, i) => i !== idx));

  // Calculate total amount
  const totalRooms = roomList.reduce((sum, r) => sum + (r.qty * r.perUnit), 0);
  const totalMeals = mealList.reduce((sum, m) => sum + (m.qty * m.amount), 0);
  const totalItems = itemList.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalAmount = totalRooms + totalMeals + totalItems;

  // Submit handler
  const handleSubmit = async () => {
    await addDoc(collection(db, 'reservations'), {
      client,
      rooms: roomList,
      meals: mealList,
      items: itemList,
      totalAmount,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    if (onClose) onClose();
  };

  return (
    <div className="add-reservation-layout">
      <button
        className="close-btn"
        type="button"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="add-reservation-form">
          <h2>CLIENT DETAILS</h2>
          <div className="form-row">
            <label>Company Name</label>
            <Select
              options={clientOptions}
              value={selectedClient}
              onChange={handleClientChange}
              placeholder="Search or select client"
              isClearable
              isSearchable
              styles={{ container: base => ({ ...base, minWidth: 220 }) }}
            />
            <button
              type="button"
              className="add-client-btn"
              onClick={() => setShowClientModal(true)}
            >
              Add Client
            </button>
          </div>
          <div className="form-row">
            <label>Contact</label>
            <input type="text" value={client.contact} readOnly />
          </div>
          <div className="form-row">
            <label>Date From</label>
            <input
              type="date"
              value={client.dateFrom}
              onChange={e => setClient({ ...client, dateFrom: e.target.value })}
            />
            <label>Date To</label>
            <input
              type="date"
              value={client.dateTo}
              onChange={e => setClient({ ...client, dateTo: e.target.value })}
            />
          </div>

          <hr className="section-divider" />

          <h2>ROOMS AND HALLS</h2>

          <div className="form-row">
            <label>Date From</label>
            <input
              type="date"
              value={newRoom.dateFrom}
              onChange={e => setNewRoom({ ...newRoom, dateFrom: e.target.value })}
            />
            <label>Date To</label>
            <input
              type="date"
              value={newRoom.dateTo}
              onChange={e => setNewRoom({ ...newRoom, dateTo: e.target.value })}
            />
          </div>

          {newRoom.dateFrom && newRoom.dateTo && (
            <div className="form-row">
              <label>Room / Hall</label>
              <Select
                options={roomOptions}
                value={roomOptions.find(r => r.value === newRoom.room) || null}
                onChange={option =>
                  setNewRoom({
                    ...newRoom,
                    room: option ? option.value : '',
                    type: option ? option.type : '',
                  })
                }
                placeholder="Room or Hall"
                isClearable
                styles={{ container: base => ({ ...base, minWidth: 180 }) }}
              />
              
              <label>Type</label>
              <select
                value={newRoom.type}
                onChange={e => setNewRoom({ ...newRoom, type: e.target.value })}
              >
                <option value="">Select</option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
              </select>
              <label>Quantity</label>
              <input
                type="number"
                value={newRoom.qty}
                onChange={e => setNewRoom({ ...newRoom, qty: Number(e.target.value) })}
              />
              <label>Per Unit</label>
              <input
                type="number"
                value={newRoom.perUnit}
                onChange={e => setNewRoom({ ...newRoom, perUnit: Number(e.target.value) })}
              />
              <button
                className="add-btn"
                type="button"
                onClick={addRoom}
              >
                +
              </button>
            </div>
          )}

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
                  <td>{r.name}</td>
                  <td>{r.type}</td>
                  <td>{r.qty}</td>
                  <td>{r.perUnit}</td>
                  <td>{r.qty * r.perUnit}</td>
                  <td>{r.dateFrom} - {r.dateTo}</td>
                  <td>
                    <button type="button" className="del-btn" onClick={() => removeRoom(idx)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="step-btn-row">
            <button className="next-btn" onClick={() => setStep(2)}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="add-reservation-form">
          <h2>MEALS</h2>
          <div className="form-row">
            <label>Meal</label>
            <input
              value={newMeal.meal}
              onChange={e => setNewMeal({ ...newMeal, meal: e.target.value })}
            />
            <label>Description</label>
            <input
              value={newMeal.description}
              onChange={e => setNewMeal({ ...newMeal, description: e.target.value })}
            />
            <label>Quantity</label>
            <input
              type="number"
              value={newMeal.qty}
              onChange={e => setNewMeal({ ...newMeal, qty: Number(e.target.value) })}
            />
            <label>Amount</label>
            <input
              type="number"
              value={newMeal.amount}
              onChange={e => setNewMeal({ ...newMeal, amount: Number(e.target.value) })}
            />
            <button className="add-btn" type="button" onClick={addMeal}>+</button>
          </div>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Total Amount</th>
                <th></th>
              </tr>
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
            <label>Item</label>
            <input
              value={newItem.item}
              onChange={e => setNewItem({ ...newItem, item: e.target.value })}
            />
            <label>Description</label>
            <input
              value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
            <label>Amount</label>
            <input
              type="number"
              value={newItem.amount}
              onChange={e => setNewItem({ ...newItem, amount: Number(e.target.value) })}
            />
            <button className="add-btn" type="button" onClick={addItem}>+</button>
          </div>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Amount</th>
                <th></th>
              </tr>
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
            >
              Calculate
            </button>
            <button className="submit-btn" type="button" onClick={handleSubmit}>Confirm Reservation</button>
          </div>
        </div>
      )}

      {showClientModal && <AddClient onClose={() => setShowClientModal(false)} />}
    </div>
  );
}

export default AddReservation;
