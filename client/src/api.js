import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // API jest teraz dostępne pod /api

// Pobieranie dostępnych miejsc parkingowych
export const fetchParkingSpaces = async () => {
  try {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const response = await axios.get(`${API_URL}/parkingSpaces`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokenu do nagłówka
      },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd przy pobieraniu miejsc parkingowych:", error);
    return [];
  }
};

// Rezerwowanie miejsca parkingowego

export const reserveParkingSpace = async (parkingId) => {
  try {
    const token = localStorage.getItem('token'); // Pobieramy token z localStorage
    if (!token) throw new Error('Brak tokenu. Zaloguj się ponownie.');
    const response = await axios.post(
      `${API_URL}/reserve`,
      { parkingId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Dodajemy token do nagłówka
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Błąd przy rezerwowaniu miejsca:', error);
    throw error;
  }
};


// Przykładowe dane użytkowników (dodatkowe funkcje)
export async function fetchUsers() {
  return [
    { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
    { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
  ];
}

export async function deleteUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}
