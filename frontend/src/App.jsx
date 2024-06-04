import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Modal from './Modal';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    image: '',
    location: '',
    time: '',
    createdBy: ''
  });

  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    }
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/events', newEvent);
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <Header handleLogout={handleLogout} />
  
      <main className="main-content">
        <div className="content-container">
        {isLoggedIn ? (
            <div>
        <div className="menu-container"> 
          <button className="menu-button">My Friends</button>
          <button className="menu-button">Discovery</button>
        </div>
              <div style={{ marginTop: '100px' }}> 
                <button onClick={() => setShowModal(true)} className="create-event-button">
                  I'm going somewhere
                </button>
              </div>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={handleSubmit} className="event-form">
                  <input
                    type="text"
                    name="title"
                    placeholder="Event name"
                    value={newEvent.title}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newEvent.image}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="datetime-local"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="createdBy"
                    placeholder="Username"
                    value={newEvent.createdBy}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <button type="submit" className="submit-button">Create Event</button>
                </form>
              </Modal>
              <div className="event-list">
                {events.map((event) => (
                  <div key={event.id} className="event">
                    <img src={event.image} alt={event.title} className="event-image" />
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-location">{event.location}</p>
                    <p className="event-time">{new Date(event.time).toLocaleString()}</p>
                    <p className="event-creator">Created by: {event.createdBy}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {showRegister ? (
                <Register setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )}
              <button onClick={() => setShowRegister(!showRegister)} className="toggle-button">
                {showRegister ? 'Go to Login' : 'Go to Register'}
              </button>
            </div>
          )}
        </div>
      </main>
  
      <footer className="footer">
        <p>&copy; wagmi</p>
      </footer>
    </div>
  );
}

export default App;
