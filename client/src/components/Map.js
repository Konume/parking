// filepath: client/src/components/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchParkingSpaces } from '../api';

function Map() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const loadSpaces = async () => {
      const data = await fetchParkingSpaces();
      setSpaces(data);
    };
    loadSpaces();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spaces.map((space) => (
        <Marker key={space.id} position={[space.latitude, space.longitude]}>
          <Popup>
            Miejsce {space.id} <br /> {space.isOccupied ? 'Zajęte' : 'Wolne'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;