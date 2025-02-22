import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchParkingSpaces } from '../api';
import L from 'leaflet';
function Map() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const loadSpaces = async () => {
      const data = await fetchParkingSpaces();
      setSpaces(data);
    };
    loadSpaces();
  }, []);
    // Set the default marker icon explicitly
    const defaultIcon = new L.Icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'), // Leaflet's default icon path
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  // Komponent do ustawiania mapy na widok znaczników
  function SetMapView() {
    const map = useMap();
    useEffect(() => {
      if (spaces.length > 0) {
        const bounds = spaces.map((space) => [space.latitude, space.longitude]);
        map.fitBounds(bounds); // Dopasowanie widoku mapy do lokalizacji znaczników
      }
    }, [spaces, map]);

    return null;
  }

  return (
    <MapContainer center={[52.2297, 21.0122]} zoom={300} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spaces.map((space) => (
        <Marker key={space.id} 
        position={[space.latitude, space.longitude]}
        icon={defaultIcon}> 
          <Popup>
            Miejsce {space.id} <br /> {space.isOccupied ? 'Zajęte' : 'Wolne'}
          </Popup>
        </Marker>
      ))}
      <SetMapView />
    </MapContainer>
  );
}

export default Map;
