import React, { useState, useEffect } from 'react';
import '../../Styles/Adminstyles/EditReservationStyle.css';

function AddMealModal({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    meal: '',
    description: '',
    qty: '',
    amount: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        meal: initialData.meal || '',
        description: initialData.description || '',
        qty: initialData.qty || '',
        amount: initialData.amount || ''
      });
    }
  }, [initialData]);

  const handleClear = () => {
    setForm({
      meal: '',
      description: '',
      qty: '',
      amount: ''
    });
  };

  const handleSubmit = () => {
    onSubmit({
      meal: form.meal,
      description: form.description,
      qty: Number(form.qty),
      amount: Number(form.amount)
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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

        <h2>{initialData ? 'EDIT MEAL' : 'ADD MEAL'}</h2>
        <div className="form-row">
          <label>Meal</label>
          <input
            value={form.meal}
            onChange={e => setForm({ ...form, meal: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
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
          <button className="clear-btn" type="button" onClick={handleClear}>
            Clear
          </button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMealModal;
