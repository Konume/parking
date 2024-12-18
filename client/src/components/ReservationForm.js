import React, { useState } from 'react';

function ReservationForm({ user }) {
  const [parkingId, setParkingId] = useState('');
  const [message, setMessage] = useState('');

  const handleReserve = async (e) => {
    e.preventDefault();

    // Sprawdzanie, czy użytkownik jest dostępny
    if (!user || !user.id) {
      setMessage('Błąd: Brak danych użytkownika.');
      return;
    }

    // Wysyłanie danych rezerwacji wraz z danymi użytkownika
    const response = await fetch('http://localhost:5001/api/reserve', {
      method: 'POST',
      body: JSON.stringify({ parkingId, userId: user.id }),
      headers: { 'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    const data = await response.json();
    setMessage(data.message); // Komunikat o rezerwacji
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Rezerwacja miejsca parkingowego</h2>
      <form onSubmit={handleReserve}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="ID miejsca parkingowego"
            value={parkingId}
            onChange={(e) => setParkingId(e.target.value)}
            className="input w-full"
          />
        </div>
        <button type="submit" className="button is-primary w-full">Rezerwuj</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReservationForm;
