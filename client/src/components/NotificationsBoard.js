import React, { useRef } from 'react';
function NotificationsBoard({ notifications = [], addNotification, removeNotification }) {
  const notificationInputRef = useRef();
  const placeInputRef = useRef();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Powiadomienia</h2>
      <div className="mb-4">
        <input
          ref={placeInputRef}
          type="text"
          placeholder="Numer miejsca parkingowego"
          className="input w-full mb-2"
        />
        <input
          ref={notificationInputRef}
          type="text"
          placeholder="Treść powiadomienia"
          className="input w-full mb-2"
        />
        <button
          className="button is-primary w-full"
          onClick={() => {
            const message = notificationInputRef.current.value;
            const placeNumber = placeInputRef.current.value;
            if (!message || !placeNumber) {
              alert("Podaj treść i numer miejsca!");
              return;
            }
            addNotification(message, placeNumber, 'info', false);
            notificationInputRef.current.value = '';
            placeInputRef.current.value = '';
          }}
        >
          Dodaj powiadomienie
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">Brak powiadomień</p>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 rounded shadow-md ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              <p>{notification.message}</p>
              <button onClick={() => removeNotification(notification.id)} className="text-sm underline mt-2">
                Zamknij
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsBoard;
