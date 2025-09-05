import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import '../../Styles/Adminstyles/addhallsrooms.css';
import AdminNav from './AdminNav';


function AddHallsRooms() {
  const [halls, setHalls] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterHallsStatus, setFilterHallsStatus] = useState('all');
  const [filterRoomsStatus, setFilterRoomsStatus] = useState('all');
  const [searchHalls, setSearchHalls] = useState('');
  const [searchRooms, setSearchRooms] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchHalls();
    fetchRooms();
  }, []);

  const fetchHalls = async () => {
    const snap = await getDocs(collection(db, 'halls'));
    setHalls(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchRooms = async () => {
    const snap = await getDocs(collection(db, 'rooms'));
    setRooms(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDeleteHall = async (id) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      await deleteDoc(doc(db, 'halls', id));
      fetchHalls();
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await deleteDoc(doc(db, 'rooms', id));
      fetchRooms();
    }
  };

  const handleStatusChangeHall = async (id, newStatus) => {
    await updateDoc(doc(db, 'halls', id), { status: newStatus });
    fetchHalls();
  };

  const handleStatusChangeRoom = async (id, newStatus) => {
    await updateDoc(doc(db, 'rooms', id), { status: newStatus });
    fetchRooms();
  };

  const handleEditHall = (id) => {
    alert(`Edit hall: ${id}`);
  };

  const handleEditRoom = (id) => {
    alert(`Edit room: ${id}`);
  };

  const filteredHalls = halls.filter(h =>
    (filterHallsStatus === 'all' || h.status === filterHallsStatus) &&
    (searchHalls === '' || h.name.toLowerCase().includes(searchHalls.toLowerCase()))
  );

  const filteredRooms = rooms.filter(r =>
    (filterRoomsStatus === 'all' || r.status === filterRoomsStatus) &&
    (searchRooms === '' || r.name.toLowerCase().includes(searchRooms.toLowerCase()))
  );

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="content-container">
        {/* HALLS */}
        <section className="section-container">
          <h2 className="section-title">HALLS</h2>
          <div className="actions-row">
            <select
              value={filterHallsStatus}
              onChange={e => setFilterHallsStatus(e.target.value)}
              className="filter-select"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="all">All</option>
            </select>
            <input
              type="search"
              value={searchHalls}
              placeholder="Search"
              onChange={e => setSearchHalls(e.target.value)}
              className="search-input"
            />
            <button className="add-btn" onClick={() => navigate("/addhallsform")}> 
  ADD NEW </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Extra Hrs</th>
                <th>Image URL</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHalls.map(hall => (
                <tr key={hall.id}>
                  <td>{hall.id}</td>
                  <td>{hall.name}</td>
                  <td>{hall.capacity}</td>
                  <td>{hall.type}</td>
                  <td>{hall.extraHrs}</td>
                  <td className="url-cell">{hall.imageURL}</td>
                  <td>
                    <select
                      value={hall.status}
                      onChange={e => handleStatusChangeHall(hall.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </td>
                  <td>{hall.amount}</td>
                  <td>
                    <button onClick={() => handleEditHall(hall.id)} className="action-btn edit-btn">✏</button>
                    <button onClick={() => handleDeleteHall(hall.id)} className="action-btn delete-btn">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ROOMS */}
        <section className="section-container" style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">ROOMS</h2>
          <div className="actions-row">
            <select
              value={filterRoomsStatus}
              onChange={e => setFilterRoomsStatus(e.target.value)}
              className="filter-select"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="all">All</option>
            </select>
            <input
              type="search"
              value={searchRooms}
              placeholder="Search"
              onChange={e => setSearchRooms(e.target.value)}
              className="search-input"
            />
            <button className="add-btn" onClick={() => navigate("/addroomsform")}> 
  ADD NEW </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Image URL</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.type}</td>
                  <td className="url-cell">{room.imageURL}</td>
                  <td>
                    <select
                      value={room.status}
                      onChange={e => handleStatusChangeRoom(room.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </td>
                  <td>{room.amount}</td>
                  <td>
                    <button onClick={() => handleEditRoom(room.id)} className="action-btn edit-btn">✏</button>
                    <button onClick={() => handleDeleteRoom(room.id)} className="action-btn delete-btn">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default AddHallsRooms;