import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../Styles/Adminstyles/Addhallsrooms.css';

function AddRoomsForm({ onClose, editingRoom }) {
  const [room, setRoom] = useState({
    name: '',
    capacity: '',
    type: '',
    amount: '',
    imageFile: null,
    imageURL: ''
  });

  useEffect(() => {
    if (editingRoom) {
      setRoom({
        name: editingRoom.name || '',
        capacity: editingRoom.capacity || '',
        type: editingRoom.type || '',
        amount: editingRoom.amount || '',
        imageURL: editingRoom.imageURL || '',
        imageFile: null
      });
    }
  }, [editingRoom]);

  const uploadImage = async (file) => {
    if (!file) return room.imageURL;
    const storageRef = ref(storage, `hallsrooms/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const submitRoom = async (e) => {
    e.preventDefault();

    if (!room.name || !room.capacity || !room.type || !room.amount) {
      alert("Please fill all required fields before submitting!");
      return;
    }

    try {
      const imageURL = room.imageFile ? await uploadImage(room.imageFile) : room.imageURL;

      const roomData = {
        name: room.name,
        capacity: Number(room.capacity),
        type: room.type,
        amount: Number(room.amount),
        imageURL
      };

      if (editingRoom) {
        await updateDoc(doc(db, 'rooms', editingRoom.id), roomData);
      } else {
        const q = query(collection(db, 'rooms'), where("name", "==", room.name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("A room with this name already exists.");
          return;
        }
        await addDoc(collection(db, 'rooms'), roomData);
      }

      if (onClose) onClose();
      clearForm();
    } catch (error) {
      console.error("Error saving room: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const clearForm = () => {
    setRoom({ name: '', capacity: '', type: '', amount: '', imageFile: null, imageURL: '' });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoom({ ...room, imageFile: file, imageURL: URL.createObjectURL(file) });
    }
  };

  return (
    <form className="form-card" onSubmit={submitRoom} noValidate>
      <h2 className="form-title">{editingRoom ? "EDIT ROOM" : "ADD A NEW ROOM"}</h2>

      <label>Room Name</label>
      <input type="text" value={room.name} onChange={e => setRoom({ ...room, name: e.target.value })} required />

      <label>Capacity</label>
      <input type="number" value={room.capacity} onChange={e => setRoom({ ...room, capacity: e.target.value })} required />

      <label>Type</label>
      <select value={room.type} onChange={e => setRoom({ ...room, type: e.target.value })} required>
        <option value="">-- Select Type --</option>
        <option value="A/C">A/C</option>
        <option value="Non A/C">Non A/C</option>
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
        <button type="submit" className="submit-btn">{editingRoom ? "Update" : "Submit"}</button>
      </div>
    </form>
  );
}

export default AddRoomsForm;
