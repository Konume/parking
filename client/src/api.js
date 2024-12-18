import axios from 'axios';

const API_URL = '/api';  // API jest teraz dostępne pod /api

// Pobieranie dostępnych miejsc parkingowych
export const fetchParkingSpaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/parkingSpaces`);
    return response.data;
  } catch (error) {
    console.error("Błąd przy pobieraniu miejsc parkingowych:", error);
    return [];
  }
};

// Rezerwowanie miejsca parkingowego
export const reserveParkingSpace = async (parkingId) => {
  try {
    const response = await axios.post(`${API_URL}/reserve`, { parkingId });
    return response.data;
  } catch (error) {
    console.error("Błąd przy rezerwowaniu miejsca:", error);
    return { success: false, message: "Błąd przy rezerwowaniu miejsca." };
  }
};



  
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
  