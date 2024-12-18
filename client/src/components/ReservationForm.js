import React, { useState } from 'react';
import { reserveParkingSpace } from '../api';


function ReservationForm({ user }) {
  const [parkingId, setParkingId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Dodano wskaźnik ładowania

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!parkingId.trim()) {
      setMessage('ID miejsca parkingowego nie może być puste.');
      return;
    }

    if (!user || !user.id) {
      setMessage('Błąd: Brak danych użytkownika.');
      return;
    }

    setIsLoading(true); // Rozpoczęcie ładowania
    try {
      const response = await reserveParkingSpace(parkingId);
      setMessage(response.message || 'Rezerwacja zakończona sukcesem.');
    } catch (error) {
      setMessage('Błąd podczas rezerwacji: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false); // Koniec ładowania
    }
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
        <button
          type="submit"
          className="button is-primary w-full"
          disabled={isLoading} // Blokada przycisku podczas ładowania
        >
          {isLoading ? 'Rezerwowanie...' : 'Rezerwuj'}
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}

export default ReservationForm;
