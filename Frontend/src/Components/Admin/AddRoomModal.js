import React, { useState } from 'react';
import '../../Styles/Adminstyles/EditReservationStyle.css';

function AddRoomModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    room: '',
    type: '',
    qty: '',
    extraHours: '',
    extraAmount: '',
    perUnit: ''
  });
  const handleClear = () => {
    setForm({ room: '', type: '', qty: '', extraHours: '', extraAmount: '', perUnit: '' });
  };
  const handleSubmit = () => {
    onSubmit({
      ...form,
      qty: Number(form.qty),
      extraHours: Number(form.extraHours),
      extraAmount: Number(form.extraAmount),
      perUnit: Number(form.perUnit)
    });
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ADD ROOM OR HALL</h2>
        <div className="form-row">
          <label>Room / Hall</label>
          <input value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Type</label>
          <input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Quantity</label>
          <input type="number" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Extra Hrs</label>
          <input type="number" value={form.extraHours} onChange={e => setForm({ ...form, extraHours: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Price for Extra hour</label>
          <input type="number" value={form.extraAmount} onChange={e => setForm({ ...form, extraAmount: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Per Unit</label>
          <input type="number" value={form.perUnit} onChange={e => setForm({ ...form, perUnit: e.target.value })} />
        </div>
        <div className="button-row">
          <button className="clear-btn" type="button" onClick={handleClear}>Clear</button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
export default AddRoomModal;
