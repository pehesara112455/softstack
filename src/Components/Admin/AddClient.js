import React, { useState } from 'react';
import '../../Styles/Adminstyles/ClientModalStyle.css'; 
import { db } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';


function ClientModal({ onClose }) {
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

  const handleClear = () => {
    setForm({
      companyName: '',
      address: '',
      type: '',
      contactNumber: '',
      email: '',
      contactPerson: '',
      nic: '',
      personContactNumber: ''
    });
  };

  const handleSubmit = async () => {
  try {
    await addDoc(collection(db, 'client-details'), form);
    alert('Client saved successfully!');
    onClose();
  } catch (error) {
    alert('Error saving client: ' + error.message);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ color: '#7a1818', textAlign: 'center', fontWeight: 700 }}>
          ADD A NEW CLIENT
        </h2>
        <b>COMPANY / ORGANIZATION DETAILS</b>
        <div className="form-row">
          <label>Company Name</label>
          <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
          <label>Contact Number</label>
          <input value={form.contactNumber} onChange={e => setForm({ ...form, contactNumber: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Address</label>
          <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <label>E-mail</label>
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="">Select</option>
            <option value="Company">Company</option>
            <option value="Organization">Organization</option>
          </select>
        </div>
        <hr className="section-divider" />
        <div className="form-row">
          <label>Contact person</label>
          <input value={form.contactPerson} onChange={e => setForm({ ...form, contactPerson: e.target.value })} />
          <label>Contact Number</label>
          <input value={form.personContactNumber} onChange={e => setForm({ ...form, personContactNumber: e.target.value })} />
        </div>
        <div className="form-row">
          <label>NIC</label>
          <input value={form.nic} onChange={e => setForm({ ...form, nic: e.target.value })} />
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

export default ClientModal;
