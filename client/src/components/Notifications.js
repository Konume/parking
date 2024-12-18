import React, { useState, useEffect, useCallback } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  // Funkcja symulująca dodanie powiadomienia - owijamy ją w useCallback, aby uniknąć zmiany przy każdym renderze
  const addNotification = useCallback((text) => {
    setNotifications((prevNotifications) => [...prevNotifications, text]);
    setMessage('');
  }, []); // useCallback w tym przypadku nie ma zależności, więc nie będzie się zmieniać

  // Usuwanie powiadomienia
  const removeNotification = (index) => {
    setNotifications((prevNotifications) => 
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  // Symulacja generowania powiadomień co 5 sekund
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification('Przypomnienie: Przestaw samochód z miejsca 3!');
    }, 5000); // Dodaje nowe powiadomienie co 5 sekund

    return () => clearInterval(interval); // Czyszczenie po zakończeniu komponentu
  }, [addNotification]); // Dodaj addNotification jako zależność, która teraz nie zmienia się na każdy render

  return (
    <div>
      <h2>Powiadomienia</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Dodaj własne powiadomienie"
        />
        <button onClick={() => addNotification(message)}>Dodaj powiadomienie</button>
      </div>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification} <button onClick={() => removeNotification(index)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
