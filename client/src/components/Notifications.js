import React, { useState } from 'react';

function Notifications({ notifications, removeNotification }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 right-4 w-80 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        {isExpanded ? 'Ukryj powiadomienia' : `Powiadomienia (${notifications.length})`}
      </button>

      {isExpanded && (
        <div className="bg-white shadow-md rounded mt-2 max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 p-4">Brak powiadomień.</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-md shadow-md my-1 ${
                  notification.type === 'success'
                    ? 'bg-green-500 text-white'
                    : notification.type === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                <p>{notification.message}</p>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-sm underline mt-2 block"
                >
                  Zamknij
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
