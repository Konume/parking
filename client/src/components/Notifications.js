import React from 'react';

function Notifications({ notifications, removeNotification }) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-md transition-transform transform ${
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
            className="text-sm underline mt-2"
          >
            Zamknij
          </button>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="text-gray-500 text-center">
          Brak powiadomień do wyświetlenia.
        </div>
      )}
    </div>
  );
}

export default Notifications;
