import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Events() {
  const [name, setName] = useState('');
  const [events, setEvents] = useState([]);

  const addEvent = () => {
    if (!name.trim()) return;
    setEvents(prev => [...prev, { id: Date.now(), name }]);
    setName('');
  };

  const removeEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const editEvent = (id) => {
    const newName = prompt('New name:');
    if (!newName) return;
    setEvents(prev => prev.map(e => e.id === id ? { ...e, name: newName } : e));
  };

  return (
    <div>
      <h3>Your Events</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Event name" />
      <button onClick={addEvent}>Add</button>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.name}{' '}
            <button onClick={() => editEvent(ev.id)}>Edit</button>{' '}
            <button onClick={() => removeEvent(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Auth0 Event Manager (Simple)</h2>

      {!isAuthenticated && (
        <div>
          <p>Please log in to manage events.</p>
          <button onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      )}

      {isAuthenticated && (
        <div>
          <div style={{ marginBottom: 10 }}>
            <strong>Signed in as:</strong> {user.name || user.email}
            <button style={{ marginLeft: 10 }} onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
          </div>
          <Events />
        </div>
      )}

      <hr />
      <p style={{ fontSize: 12, color: '#666' }}>
        Put your Auth0 values in a `.env` file:
        <code>REACT_APP_AUTH0_DOMAIN</code> and <code>REACT_APP_AUTH0_CLIENT_ID</code>
      </p>
    </div>
  );
}
