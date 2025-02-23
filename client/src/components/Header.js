import React from 'react';

function Header({ setView, user, handleLogout, notifications, removeNotification }) {
  return (
    <nav className="flex justify-center space-x-4 bg-gray-200 p-4 shadow-md w-full">
      {user && (
        <>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('parking')}
          >
            Miejsca Parkingowe
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('reservation')}
          >
            Rezerwacja
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('cancelReservation')}
          >
            Anulowanie Rezerwacji
          </button>
          {/*Ukrycie sekcji "Użytkownicy" dla nie-adminów */}
          {user?.role === 'admin' && (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setView('users')}
            >
              Użytkownicy
            </button>
          )}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('notificationsboard')}
          >
            Powiadomienia
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('map')}
          >
            Mapa
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={handleLogout} // Wylogowanie
          >
            Wyloguj
          </button>
        </>
      )}
      {!user && (
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setView('login')}
        >
          Zaloguj
        </button>
      )}
    </nav>
  );
}

export default Header;
