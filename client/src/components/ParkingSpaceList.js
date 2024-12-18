import React, { useState, useEffect } from 'react';
import { fetchParkingSpaces } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function ParkingSpaceList() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const loadSpaces = async () => {
      const data = await fetchParkingSpaces();
      setSpaces(data);
    };
    loadSpaces();
  }, []);

  return (
    <div>
      <h2>Status miejsc parkingowych</h2>
      <div>
      <FontAwesomeIcon icon={faCar} /> {/* Ikona samochodu */}
        {/* Możesz dodać opis lub inne informacje o samochodzie */}
      </div>
      <div>
      <FontAwesomeIcon icon={faCheckCircle} /> {/* Ikona oznaczająca "zajęte" */}
      </div>
      <div>
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <div key={space.id}>
              <i className={space.isOccupied ? 'fas fa-times-circle' : 'fas fa-check-circle'}></i> {/* Ikona zajęte/wyzwolone */}
              {space.id} - {space.isOccupied ? 'Zajęte' : 'Wolne'}
            </div>
          ))
        ) : (
          <p>Ładowanie...</p>
        )}
      </div>
    </div>
  );
}

export default ParkingSpaceList;
