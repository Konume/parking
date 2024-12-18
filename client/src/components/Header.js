import React from 'react';

function Header({ setView }) {
  return (
    <nav>
      <button onClick={() => setView('parking')}>Status parkingu</button>
      <button onClick={() => setView('reservation')}>Rezerwacja</button>
      <button onClick={() => setView('users')}>Użytkownicy</button>
      <button onClick={() => setView('notifications')}>Powiadomienia</button>
    </nav>
  );
}

export default Header;
