import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import '../../Styles/Adminstyles/addhallsrooms.css';
import AdminNav from './AdminNav';
import AddHallsForm from './AddHallsForm';
import AddRoomsForm from './AddRoomsForm';


function AddHallsRooms() {
  const [halls, setHalls] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterHallsStatus, setFilterHallsStatus] = useState('all');
  const [filterRoomsStatus, setFilterRoomsStatus] = useState('all');
  const [searchHalls, setSearchHalls] = useState('');
  const [searchRooms, setSearchRooms] = useState('');


  //control popup
  const [showHallForm, setShowHallForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  
  // Edit states
  const [editingHall, setEditingHall] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  // Pagination states
  const [currentHallsPage, setCurrentHallsPage] = useState(1);
  const [currentRoomsPage, setCurrentRoomsPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    // Real-time listener for halls
    const hallsCollection = collection(db, 'halls');
    const unsubscribeHalls = onSnapshot(hallsCollection, (snapshot) => {
      const hallsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHalls(hallsData);
    });

    // Real-time listener for rooms
    const roomsCollection = collection(db, 'rooms');
    const unsubscribeRooms = onSnapshot(roomsCollection, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
    });


    return () => {
      unsubscribeHalls();
      unsubscribeRooms();
    };
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


    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await deleteDoc(doc(db, 'rooms', id));

    }
  };


  const handleEditHall = (id) => {
    const hallToEdit = halls.find(hall => hall.id === id);
    if (hallToEdit) {
      setEditingHall(hallToEdit);
      setShowHallForm(true);
    }
  };

  const handleEditRoom = (id) => {
    const roomToEdit = rooms.find(room => room.id === id);
    if (roomToEdit) {
      setEditingRoom(roomToEdit);
      setShowRoomForm(true);
    }
  };

  const handleCloseHallForm = () => {
    setShowHallForm(false);
    setEditingHall(null);
  };

  const handleCloseRoomForm = () => {
    setShowRoomForm(false);
    setEditingRoom(null);
  };

  const handleAddNewHall = () => {
    setEditingHall(null);
    setShowHallForm(true);
  };

  const handleAddNewRoom = () => {
    setEditingRoom(null);
    setShowRoomForm(true);

  };

  const filteredHalls = halls.filter(h =>
    (filterHallsStatus === 'all' || h.status === filterHallsStatus) &&

    (searchHalls === '' || h.name.toLowerCase().includes(searchHalls.toLowerCase())))
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const filteredRooms = rooms.filter(r =>
    (filterRoomsStatus === 'all' || r.status === filterRoomsStatus) &&
    (searchRooms === '' || r.name.toLowerCase().includes(searchRooms.toLowerCase())))
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  // Pagination calculations for halls
  const indexOfLastHall = currentHallsPage * rowsPerPage;
  const indexOfFirstHall = indexOfLastHall - rowsPerPage;
  const currentHalls = filteredHalls.slice(indexOfFirstHall, indexOfLastHall);
  const totalHallsPages = Math.ceil(filteredHalls.length / rowsPerPage);

  // Pagination calculations for rooms
  const indexOfLastRoom = currentRoomsPage * rowsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - rowsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalRoomsPages = Math.ceil(filteredRooms.length / rowsPerPage);


  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="content-container">

        {/* HALLS */}
        <section className="section-container">
          <h2 className="section-title">HALLS</h2>
          <div className="actions-row">

            <input
              type="search"
              value={searchHalls}
              placeholder="Search"

              onChange={e => {
                setSearchHalls(e.target.value);
                setCurrentHallsPage(1); 
              }}
              className="search-input"
            />
            <button className="add-btn" onClick={handleAddNewHall}>
              ADD NEW
            </button>

          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Extra Hrs</th>
                <th>Image</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {currentHalls.length > 0 ? (
                currentHalls.map(hall => (
                  <tr key={hall.id}>
                    <td>{hall.name}</td>
                    <td>{hall.capacity}</td>
                    <td>{hall.type}</td>
                    <td>{hall.extraHrs}</td>
                    <td>{hall.imageURL ? ( <img  src={hall.imageURL}  alt={hall.name}  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "6px" }}   />  ) : (  "No Image"  )}</td>
                    <td>{hall.amount}</td>
                    <td>
                      <button onClick={() => handleEditHall(hall.id)} className="action-btn edit-btn">✏</button>
                      <button onClick={() => handleDeleteHall(hall.id)} className="action-btn delete-btn">🗑</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No halls found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Halls Pagination Controls */}
          {filteredHalls.length > rowsPerPage && (
            <div className="pagination">
              <button
                disabled={currentHallsPage === 1}
                onClick={() => setCurrentHallsPage(currentHallsPage - 1)}
              >
                ←
              </button>
              <span>
                Page {currentHallsPage} of {totalHallsPages}
              </span>
              <button
                disabled={currentHallsPage === totalHallsPages}
                onClick={() => setCurrentHallsPage(currentHallsPage + 1)}
              >
                →
              </button>
            </div>
          )}

        </section>

        {/* ROOMS */}
        <section className="section-container" style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">ROOMS</h2>
          <div className="actions-row">

            <input
              type="search"
              value={searchRooms}
              placeholder="Search"

              onChange={e => {
                setSearchRooms(e.target.value);
                setCurrentRoomsPage(1); 
              }}
              className="search-input"
            />
            <button className="add-btn" onClick={handleAddNewRoom}>ADD NEW</button>

          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Image</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {currentRooms.length > 0 ? (
                currentRooms.map(room => (
                  <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.capacity}</td>
                    <td>{room.type}</td>
                    <td> {room.imageURL ? ( <img  src={room.imageURL}  alt={room.name}  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "6px" }}   />  ) : (  "No Image"  )}</td>
                    <td>{room.amount}</td>
                    <td>
                      <button onClick={() => handleEditRoom(room.id)} className="action-btn edit-btn">✏</button>
                      <button onClick={() => handleDeleteRoom(room.id)} className="action-btn delete-btn">🗑</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Rooms Pagination Controls */}
          {filteredRooms.length > rowsPerPage && (
            <div className="pagination">
              <button
                disabled={currentRoomsPage === 1}
                onClick={() => setCurrentRoomsPage(currentRoomsPage - 1)}
              >
                ←
              </button>
              <span>
                Page {currentRoomsPage} of {totalRoomsPages}
              </span>
              <button
                disabled={currentRoomsPage === totalRoomsPages}
                onClick={() => setCurrentRoomsPage(currentRoomsPage + 1)}
              >
                →
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Halls Popup Modal */}
      {showHallForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddHallsForm 
              onClose={handleCloseHallForm} 
              editingHall={editingHall}
            />
            <button className="close-btn" onClick={handleCloseHallForm}>✖</button>
          </div>
        </div>
      )}

      {/* Rooms Popup Modal */}
      {showRoomForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddRoomsForm 
              onClose={handleCloseRoomForm} 
              editingRoom={editingRoom}
            />
            <button className="close-btn" onClick={handleCloseRoomForm}>✖</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AddHallsRooms;
