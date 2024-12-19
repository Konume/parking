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
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Brak tokenu. Zaloguj się ponownie.');
    const response = await axios.post(
      `${API_URL}/reserve`,
      { parkingId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Błąd przy rezerwowaniu miejsca:', error.response?.data || error.message);
    throw error;
  }
};

export const cancelParkingSpaceReservation = async (parkingId) => {
  try {
    const token = localStorage.getItem('token'); // Pobieranie tokenu z localStorage
    if (!token) throw new Error('Brak tokenu. Zaloguj się ponownie.');
    const response = await fetch(`${API_URL}/parking-spaces/${parkingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Token JWT
      },
    });

    if (!response.ok) {
      throw new Error('Błąd podczas anulowania rezerwacji');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Błąd anulowania rezerwacji');
  }
};


// Przykładowe dane użytkowników (dodatkowe funkcje)
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // Pobierz token z localStorage
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokenu do nagłówka
      },
    });
    return response.data; // Zwrócenie rzeczywistych danych użytkowników
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników:', error.response?.data || error.message);
    throw error;
  }
};


export const createUser = async (user) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/users`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const updateUser = async (id, user) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/users/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Przypuszczamy, że API zwraca odpowiedź o sukcesie
  } catch (error) {
    console.error('Błąd przy usuwaniu użytkownika:', error.response?.data || error.message);
    throw error;
  }
};

