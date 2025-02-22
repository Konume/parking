import React, { useState, useEffect } from 'react';
import { fetchParkingSpaces, cancelParkingSpaceReservation } from '../api'; // Funkcja do usuwania rezerwacji
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CancelReservation() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Przechowywanie błędów

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const data = await fetchParkingSpaces();
        if (data && Array.isArray(data)) {
          setSpaces(data.filter(space => space.isOccupied)); // Filtrujemy tylko zajęte miejsca
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

  const handleCancelReservation = async (parkingId) => {
    try {
      const response = await cancelParkingSpaceReservation(parkingId); // Funkcja do usuwania rezerwacji
      toast.success(response.message); // Powiadomienie sukcesu

      // Aktualizacja stanu po anulowaniu rezerwacji
      setSpaces((prevSpaces) =>
        prevSpaces.filter((space) => space.id !== parkingId)
      );
    } catch (error) {
      console.error("Błąd anulowania rezerwacji:", error);
      toast.error("Anulowanie rezerwacji nie powiodło się.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Anulowanie rezerwacji miejsc parkingowych
      </h2>

      {/* Sekcja błędów */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Sekcja ładowania */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        // Siatka zarezerwowanych miejsc
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <div
                key={space.id}
                className="p-4 border rounded-lg shadow-md bg-red-600 hover:bg-red-700 cursor-pointer"
                onClick={() => handleCancelReservation(space.id)}
              >
                <img
                  src="/image/car.svg"
                  alt="Zajęte miejsce"
                  className="w-full h-28 sm:h-32 object-contain mb-4"
                />
                <p className="text-white text-center font-semibold">Miejsce {space.id}</p>
                <p className="text-white text-center mt-2">Zajęte</p>
                {space.reservedBy && (
        <p className="text-white text-center mt-2">
          Zarezerwowane przez: {space.reservedBy.name || "Nieznany użytkownik"}
        </p>
      )}
                <p className="text-white text-center mt-2">Kliknij, aby anulować rezerwację</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Brak zarezerwowanych miejsc.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CancelReservation;
