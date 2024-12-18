import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ParkingSpaceList from './components/ParkingSpaceList';
import ReservationForm from './components/ReservationForm';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import Notifications from './components/Notifications';
import NotificationsBoard from './components/NotificationsBoard';
import CancelReservation from './components/CancelReservation';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]); // Stan powiadomień

  // Dodawanie powiadomienia
  const addNotification = (message, type = 'success') => {
    const newNotification = {
      id: new Date().getTime(), // Unikalne ID na podstawie czasu
      message,
      type,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    // Ustawiamy timer, który usunie powiadomienie po 5 sekundach
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  // Usuwanie powiadomienia
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setView('parking');
    localStorage.setItem('user', JSON.stringify(userData));
    addNotification('Zalogowano pomyślnie!', 'success'); // Powiadomienie po logowaniu
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    addNotification('Wylogowano pomyślnie!', 'success'); // Powiadomienie po wylogowaniu
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
        return <UserManagement />;
      case 'notificationsboard':
        return <NotificationsBoard notifications={notifications} removeNotification={removeNotification} />;
      case 'cancelReservation':
        return <CancelReservation />;
      default:
        return <div>Wybierz widok</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        setView={setView} 
        user={user} 
        handleLogout={handleLogout} 
        notifications={notifications} // Przekazujemy powiadomienia do nagłówka
        removeNotification={removeNotification} 
      />
      {/* Przekazujemy powiadomienia do komponentu Notifications */}
      <Notifications notifications={notifications} removeNotification={removeNotification} />
      <main className="flex-grow container mx-auto p-6">{renderView()}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Parking App. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default App;
