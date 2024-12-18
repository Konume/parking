import React, { useState, useEffect, useRef } from 'react';
import Notifications from './Notifications';

function NotificationsBoard() {
  const [notifications, setNotifications] = useState([]);
  const nextId = useRef(1); // Do nadawania unikalnych ID powiadomieniom
  const timers = useRef({}); // Do śledzenia timerów

  // Funkcja dodająca powiadomienie
  const addNotification = (message, type = 'info') => {
    const id = nextId.current++;
    setNotifications((prev) => [
      ...prev,
      { id, message, type },
    ]);

    // Ustaw timer do usunięcia powiadomienia po 5 sekundach
    const timer = setTimeout(() => removeNotification(id), 5000);
    timers.current[id] = timer;
  };

  // Funkcja usuwająca powiadomienie
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    // Wyczyść timer powiązany z tym powiadomieniem
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  };

  // Czyszczenie wszystkich timerów przy odmontowaniu komponentu
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <div>
      <h2>Powiadomienia</h2>
      <div>
        <input
          type="text"
          placeholder="Dodaj własne powiadomienie"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNotification(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            const message = document.querySelector('input').value;
            addNotification(message);
            document.querySelector('input').value = '';
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
