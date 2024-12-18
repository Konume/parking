import React from 'react';

function Header({ setView, user, handleLogout }) {
  return (
    <nav className="flex justify-center space-x-4 bg-gray-200 p-4 shadow-md">
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
            Rezerwacje
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('users')}
          >
            Użytkownicy
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setView('notifications')}
          >
            Powiadomienia
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
