import React, { useState } from 'react';
import '../../Styles/Adminstyles/EditReservationStyle.css';

function AddMealModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    meal: '',
    description: '',
    qty: '',
    amount: ''
  });

  const handleClear = () => {
    setForm({ meal: '', description: '', qty: '', amount: '' });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      qty: Number(form.qty),
      amount: Number(form.amount)
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ADD MEAL</h2>
        <div className="form-row">
          <label>Meal</label>
          <input value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
          />
        </div>
        <div className="form-row">
          <label>Quantity</label>
          <input
            type="number"
            value={form.qty}
            onChange={e => setForm({ ...form, qty: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
        </div>
        <div className="button-row">
          <button className="clear-btn" type="button" onClick={handleClear}>Clear</button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
export default AddMealModal;
