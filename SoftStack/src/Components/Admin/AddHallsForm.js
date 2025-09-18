
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../Styles/Adminstyles/Addhallsrooms.css';

function AddHallsForm({ onClose, editingHall }) {

  const [hall, setHall] = useState({
    name: '',
    capacity: '',
    type: '',
    extraHrs: '',
    amount: '',

    imageFile: null,
    imageURL: ''
  });

  useEffect(() => {
    if (editingHall) {
      setHall({
        name: editingHall.name || '',
        capacity: editingHall.capacity || '',
        type: editingHall.type || '',
        extraHrs: editingHall.extraHrs || '',
        amount: editingHall.amount || '',
        imageURL: editingHall.imageURL || '',
        imageFile: null
      });
    }
  }, [editingHall]);

  const uploadImage = async (file) => {
  const storageRef = ref(storage, `hallsrooms/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

  const submitHall = async (e) => {
    e.preventDefault();

    if (!hall.name || !hall.capacity || !hall.type || !hall.amount) {
      alert("Please fill all required fields before submitting!");
      return;
    }

    try {
      const imageURL = hall.imageFile ? await uploadImage(hall.imageFile) : hall.imageURL;

      const hallData = {
        name: hall.name,
        capacity: Number(hall.capacity),
        type: hall.type,
        extraHrs: hall.extraHrs || "",
        amount: Number(hall.amount),
        imageURL
      };

      if (editingHall) {
        await updateDoc(doc(db, 'halls', editingHall.id), hallData);
      } else {
        const q = query(collection(db, 'halls'), where("name", "==", hall.name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("A hall with this name already exists.");
          return;
        }
        await addDoc(collection(db, 'halls'), hallData);
      }

      if (onClose) onClose();
      clearForm();
    } catch (error) {
      console.error("Error saving hall: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const clearForm = () => {
    setHall({ name: '', capacity: '', type: '', extraHrs: '', amount: '', imageFile: null, imageURL: '' });

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
      <h2 className="form-title">{editingHall ? "EDIT HALL" : "ADD A NEW HALL"}</h2>

      
      <label>Hall Name</label>
      <input type="text" value={hall.name} onChange={e => setHall({ ...hall, name: e.target.value })} required />

      <label>Capacity</label>
      <input type="number" value={hall.capacity} onChange={e => setHall({ ...hall, capacity: e.target.value })} required />

      <label>Type</label>
      <select value={hall.type} onChange={e => setHall({ ...hall, type: e.target.value })} required>
        <option value="">-- Select Type --</option>

        <option value="A/C">A/C</option>
        <option value="Non A/C">Non A/C</option>
      </select>

      <label>Extra Hour (Optional)</label>

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



        <button type="submit" className="submit-btn">{editingHall ? "Update" : "Submit"}</button>
      </div>
    </form>
    </div>
  );

}

export default AddHallsForm;
