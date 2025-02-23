import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParkingSpaceList from './components/ParkingSpaceList';
import ReservationForm from './components/ReservationForm';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import Notifications from './components/Notifications';
import NotificationsBoard from './components/NotificationsBoard';
import CancelReservation from './components/CancelReservation';
import Map from './components/Map';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]); // Stan powiadomień
  const [reservations, setReservations] = useState([]);

  // Znajdź użytkownika, który ma rezerwację na to miejsce
  const findUserByPlace = (placeNumber) => {
    return reservations.find((res) => res.placeNumber === placeNumber)?.user || null;
  };

  // Dodawanie powiadomienia
  const addNotification = (message, placeNumber, type = 'info', autoRemove = false) => {
    if (!placeNumber) {
      alert('Podaj numer miejsca parkingowego!');
      return;
    }
    const newNotification = {
      id: new Date().getTime(), // Unikalne ID na podstawie czasu
      message: `Miejsce parkingowe: ${placeNumber} - ${message}`,
      type,
      placeNumber,
      userId: findUserByPlace(placeNumber)?.id || null,
    };

    setNotifications((prev) => [...prev, newNotification]);

    if (autoRemove) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    } else {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 15 * 60 * 1000); // 15 minut
    }
  };

  // Usuwanie powiadomienia
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setView('parking');
    localStorage.setItem('user', JSON.stringify(userData));
    addNotification('Zalogowano pomyślnie!', 'System', 'success', true);
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    addNotification('Wylogowano pomyślnie!', 'System', 'success', true);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('parking');
    }
  }, []);

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'parking':
        return <ParkingSpaceList />;
      case 'reservation':
        return <ReservationForm user={user} />;
      case 'users':
        return user?.role === 'admin' ? (
          <UserManagement />
        ) : (
          <p className="text-center text-red-500">Brak uprawnień do tej strony.</p>
        );
      case 'notificationsboard':
        return (
          <NotificationsBoard
            notifications={notifications}
            addNotification={addNotification}
            removeNotification={removeNotification}
          />
        );
      case 'cancelReservation':
        return <CancelReservation />;
      case 'map':
        return <Map />;
      default:
        return <div>Wybierz widok</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header setView={setView} user={user} handleLogout={handleLogout} />
      <Notifications notifications={notifications} removeNotification={removeNotification} />
      <main className="flex-grow container mx-auto p-6">{renderView()}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Parking App. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default App;
