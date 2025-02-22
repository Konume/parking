
import React, { useState, useEffect } from 'react';
import { fetchParkingSpaces, reserveParkingSpace } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Komponent Kafelka miejsca parkingowego
const ParkingSpaceCard = ({ space, onReserve }) => (
  <div
    className={`p-4 border rounded-lg shadow-md cursor-pointer 
                transition-all transform hover:scale-105 
                ${space.isOccupied ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
    onClick={() => !space.isOccupied && onReserve(space.id)}
  >
    <img
      src={space.isOccupied ? "/image/car.svg" : "/image/spot.svg"}
      alt="Parking"
      className="w-full h-28 sm:h-32 object-contain mb-4 group-hover:opacity-80"
    />
    <p className="text-white text-center font-semibold">Miejsce {space.id}</p>
    <p className="text-white text-center mt-2">
      {space.isOccupied ? "Zajęte" : "Wolne"}
    </p>
    {space.isOccupied && space.reservedBy && (
      <p className="text-white text-center text-sm mt-1">
        Zarezerwowane przez: {space.reservedBy.name || "Nieznany użytkownik"}
      </p>
    )}
  </div>
);

// Główny komponent listy miejsc parkingowych
function ParkingSpaceList() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Przechowywanie błędów

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const data = await fetchParkingSpaces();
        if (data && Array.isArray(data)) {
          setSpaces(data);
        } else {
          throw new Error("Nieprawidłowe dane.");
        }
      } catch (error) {
        console.error("Błąd ładowania danych:", error);
        setError("Nie udało się załadować miejsc parkingowych.");
        toast.error("Nie udało się załadować miejsc parkingowych.");
      } finally {
        setLoading(false);
      }
    };
    loadSpaces();
  }, []);

  const handleReserve = async (parkingId) => {
    try {
      const response = await reserveParkingSpace(parkingId);
      toast.success(response.message); // Powiadomienie sukcesu
      // Aktualizacja stanu po rezerwacji
      const updatedSpaces = spaces.map(space =>
        space.id === parkingId ? { ...space, isOccupied: true } : space
      );
      setSpaces(updatedSpaces);
    } catch (error) {
      console.error("Błąd rezerwacji:", error);
      toast.error("Rezerwacja nie powiodła się.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Status miejsc parkingowych
      </h2>

      {/* Sekcja błędów */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Sekcja ładowania */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        // Siatka miejsc parkingowych
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <ParkingSpaceCard
                key={space.id}
                space={space}
                onReserve={handleReserve}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Brak dostępnych danych.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ParkingSpaceList;
