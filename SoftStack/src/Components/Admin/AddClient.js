
import React, { useState, useEffect } from 'react';
import '../../Styles/Adminstyles/ClientModalStyle.css';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';

function ClientModal({ onClose, initialData }) {
  // Initialize form state with initialData if provided (for editing), else empty for adding






  const [form, setForm] = useState({
    companyName: '',
    address: '',
    type: '',
    contactNumber: '',
    email: '',
    contactPerson: '',
    nic: '',
    personContactNumber: ''
  });


  useEffect(() => {
    if (initialData) {
      setForm({
        companyName: initialData.companyName || '',
        address: initialData.address || '',
        type: initialData.type || '',
        contactNumber: initialData.contactNumber || '',
        email: initialData.email || '',
        contactPerson: initialData.contactPerson || '',
        nic: initialData.nic || '',
        personContactNumber: initialData.personContactNumber || ''
      });
    }
  }, [initialData]);




  const handleSubmit = async () => {
    try {
      if (initialData?.id) {
        // Update existing client
        await updateDoc(doc(db, 'client-details', initialData.id), {
          ...form
        });
        alert('Client updated successfully!');
      } else {
        // Add new client
        await addDoc(collection(db, 'client-details'), {
          ...form,
          createdAt: serverTimestamp()
        });
        alert('Client saved successfully!');
      }
      onClose();
    } catch (error) {
      alert('Error saving client: ' + error.message);
    }
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

        <h2 style={{ color: '#7a1818', textAlign: 'center', fontWeight: 700 }}>
          {initialData ? 'EDIT CLIENT' : 'ADD A NEW CLIENT'}

       
        </h2>
        <b>COMPANY / ORGANIZATION DETAILS</b>
        <div className="form-row">
          <label>Company Name</label>

          <input
            value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
          />
          <label>Contact Number</label>
          <input
            value={form.contactNumber}
            onChange={e => setForm({ ...form, contactNumber: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Address</label>
          <input
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
          <label>E-mail</label>
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >


            <option value="">Select</option>
            <option value="Company">Company</option>
            <option value="Organization">Organization</option>
          </select>
        </div>
        <hr className="section-divider" />
        <div className="form-row">
          <label>Contact person</label>

          <input
            value={form.contactPerson}
            onChange={e => setForm({ ...form, contactPerson: e.target.value })}
          />
          <label>Contact Number</label>
          <input
            value={form.personContactNumber}
            onChange={e => setForm({ ...form, personContactNumber: e.target.value })}
          />
        </div>
        <div className="form-row">
          <label>NIC</label>
          <input
            value={form.nic}
            onChange={e => setForm({ ...form, nic: e.target.value })}
          />

        </div>
        <div className="button-row">
          <button className="clear-btn" type="button" onClick={handleClear}>
            Clear
          </button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>

            {initialData ? 'Update' : 'Submit'}

            Submit

          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientModal;
