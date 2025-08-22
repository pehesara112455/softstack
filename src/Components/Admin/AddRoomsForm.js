import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../Styles/Adminstyles/addhallsrooms.css';

function AddRoomsForm({ onClose }) {
  const [room, setRoom] = useState({
    name: '',
    capacity: '',
    type: '',
    amount: '',
    imageURL: ''
  });

  const submitRoom = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'rooms'), {
      name: room.name,
      capacity: Number(room.capacity),
      type: room.type,
      amount: Number(room.amount),
      imageURL: room.imageURL,
      status: 'available'
    });
    if (onClose) onClose();
    clearForm();
  };

  const clearForm = () => {
    setRoom({ name: '', capacity: '', type: '', amount: '', imageURL: '' });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoom({ ...room, imageURL: URL.createObjectURL(file) });
    }
  };

  return (
    <form className="form-card" onSubmit={submitRoom} noValidate>
      <h2 className="form-title">ADD A NEW ROOM</h2>
      <label>Room Name</label>
      <input type="text" value={room.name} onChange={e => setRoom({ ...room, name: e.target.value })} required />

      <label>Capacity</label>
      <input type="number" value={room.capacity} onChange={e => setRoom({ ...room, capacity: e.target.value })} required />

      <label>Type</label>
      <select value={room.type} onChange={e => setRoom({ ...room, type: e.target.value })} required>
        <option value="">-- Select Type --</option>
        <option value="ac">A/C</option>
        <option value="nonac">Non A/C</option>
      </select>

      <label>Amount</label>
      <input type="number" value={room.amount} onChange={e => setRoom({ ...room, amount: e.target.value })} required />

      <label>Image</label>
      <div className="image-upload-box" onClick={() => document.getElementById('roomImage').click()}>
        {room.imageURL ? <img src={room.imageURL} alt="Room" /> : <span>📷</span>}
      </div>
      <input type="file" id="roomImage" style={{ display: 'none' }} onChange={onImageChange} accept="image/*" />

      <div className="form-btn-row">
        <button type="button" className="clear-btn" onClick={clearForm}>Clear</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  );
}

export default AddRoomsForm;