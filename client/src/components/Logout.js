import React from 'react';

function Logout({ handleLogout }) {
  return (
    <button
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
      onClick={handleLogout} // Wywołujemy funkcję przekazaną z `App`
    >
      Wyloguj się
    </button>
  );
}

export default Logout;
