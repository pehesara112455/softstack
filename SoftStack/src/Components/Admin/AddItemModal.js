import React, { useState, useEffect } from 'react';
import '../../Styles/Adminstyles/EditReservationStyle.css';

function AddItemModal({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    item: '',
    description: '',
    amount: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        item: initialData.item || '',
        description: initialData.description || '',
        amount: initialData.amount || ''
      });
    }
  }, [initialData]);

  const handleClear = () => {
    setForm({
      item: '',
      description: '',
      amount: ''
    });
  };

  const handleSubmit = () => {
    onSubmit({
      item: form.item,
      description: form.description,
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

        <h2>{initialData ? 'EDIT ITEM' : 'ADD ITEM'}</h2>
        <div className="form-row">
          <label>Item</label>
          <input
            value={form.item}
            onChange={e => setForm({ ...form, item: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
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

export default AddItemModal;
