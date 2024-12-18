import React, { useState } from 'react';

function Notifications({ notifications, removeNotification }) {
  const [isExpanded, setIsExpanded] = useState(false); // Zmienna do kontrolowania rozwinięcia listy

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {/* Przycisk rozwijania listy powiadomień */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        {isExpanded ? 'Ukryj powiadomienia' : 'Pokaż wszystkie powiadomienia'}
      </button>

      {/* Wyświetlanie powiadomień */}
      {isExpanded && notifications.length === 0 ? (
        <div className="text-center text-gray-500">Brak powiadomień do wyświetlenia.</div>
      ) : (
        <div className={`transition-all ${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded shadow-md transition-transform transform ${
                notification.type === 'success'
                  ? 'bg-green-500 text-white'
                  : notification.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              } fade-in`}
            >
              <p>{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-sm underline mt-2"
              >
                Zamknij
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
