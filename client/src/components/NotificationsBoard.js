import React, { useState, useRef } from 'react';
import Notifications from './Notifications';

function NotificationsBoard() {
  const [notifications, setNotifications] = useState([]);
  const nextId = useRef(1); // Unikalne ID dla powiadomień
   

  const notificationInputRef = useRef(); // Ref do inputa

  const addNotification = (message, type = 'info') => {
    const id = nextId.current++;
    setNotifications((prev) => [
      ...prev,
      { id, message, type },
    ]);
    console.log("Added notification:", message);

  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    
  };



  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Powiadomienia</h2>
      <div className="mb-4">
        <input
          ref={notificationInputRef}
          type="text"
          placeholder="Dodaj własne powiadomienie"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNotification(e.target.value);
              e.target.value = '';
            }
          }}
          className="input w-full"
        />
        <button
          className="button is-primary w-full"
          onClick={() => {
            const message = notificationInputRef.current.value;
            addNotification(message);
            notificationInputRef.current.value = ''; // Resetowanie inputa
          }}
        >
          Dodaj powiadomienie
        </button>
      </div>
      <Notifications
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}

export default NotificationsBoard;
