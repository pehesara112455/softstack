import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../../Styles/Adminstyles/addhallsrooms.css';

function AddHallsForm({ onClose }) {
  const [hall, setHall] = useState({
    name: '',
    capacity: '',
    type: '',
    extraHrs: '',
    amount: '',
    imageURL: ''
  });

  const submitHall = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'halls'), {
      name: hall.name,
      capacity: Number(hall.capacity),
      type: hall.type,
      extraHrs: hall.extraHrs,
      amount: Number(hall.amount),
      imageURL: hall.imageURL,
      status: 'available'
    });
    if (onClose) onClose();
    clearForm();
  };

  const clearForm = () => {
    setHall({ name: '', capacity: '', type: '', extraHrs: '', amount: '', imageURL: '' });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHall({ ...hall, imageURL: URL.createObjectURL(file) });
    }
  };

  return (
  <div className="form-container">
  <button
  className="close-btn"
  type="button"
  onClick={onClose}
  style={{
    position: 'absolute',
    top: '12px',
    right: '18px',
    fontSize: '22px',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  }}
  aria-label="Close"
>
  ×
</button>

    <form className="form-card" onSubmit={submitHall} noValidate>
      <h2 className="form-title">ADD A NEW HALL</h2>
      
      <label>Hall Name</label>
      <input type="text" value={hall.name} onChange={e => setHall({ ...hall, name: e.target.value })} required />

      <label>Capacity</label>
      <input type="number" value={hall.capacity} onChange={e => setHall({ ...hall, capacity: e.target.value })} required />

      <label>Type</label>
      <select value={hall.type} onChange={e => setHall({ ...hall, type: e.target.value })} required>
        <option value="">-- Select Type --</option>
        <option value="ac">A/C</option>
        <option value="nonac">Non A/C</option>
      </select>

      <label>Extra Hour</label>
      <input type="text" value={hall.extraHrs} onChange={e => setHall({ ...hall, extraHrs: e.target.value })} />

      <label>Amount</label>
      <input type="number" value={hall.amount} onChange={e => setHall({ ...hall, amount: e.target.value })} required />

      <label>Image</label>
      <div className="image-upload-box" onClick={() => document.getElementById('hallImage').click()}>
        {hall.imageURL ? <img src={hall.imageURL} alt="Hall" /> : <span>📷</span>}
      </div>
      <input type="file" id="hallImage" style={{ display: 'none' }} onChange={onImageChange} accept="image/*" />

      <div className="form-btn-row">
        <button type="button" className="clear-btn" onClick={clearForm}>Clear</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  </div>
);

}

export default AddHallsForm;
