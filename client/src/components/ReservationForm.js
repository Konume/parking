import React, { useState } from 'react';
import { reserveParkingSpace } from '../api';

function ReservationForm() {
  const [parkingId, setParkingId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!parkingId) {
      setMessage('Podaj ID miejsca parkingowego.');
      return;
    }
 
    // Wywołanie API do rezerwacji
 const response = await reserveParkingSpace(parkingId);
 setMessage(response.message);
 setParkingId('');
};
  
return (
  <div className="container">
    <h2 className="title is-3">Rezerwacja miejsca parkingowego</h2>
    <form onSubmit={handleReserve}>
      <div className="field">
        <label className="label">ID miejsca parkingowego:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={parkingId}
            onChange={(e) => setParkingId(e.target.value)}
          />
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-primary">Rezerwuj</button>
      </div>
      {message && <p className="help is-danger">{message}</p>}
    </form>
  </div>
);
}

export default ReservationForm;
