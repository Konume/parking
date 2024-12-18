import React from 'react';

function Notifications({ notifications, removeNotification }) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`p-4 rounded shadow-md ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(index)}
            className="text-sm underline mt-2"
          >
            Zamknij
          </button>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="text-gray-500 text-center">Brak powiadomień do wyświetlenia.</div>
      )}
    </div>
  );
}

export default Notifications;
