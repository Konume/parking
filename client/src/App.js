import React from 'react';
import Header from './components/Header';
import ParkingSpaceList from './components/ParkingSpaceList';
import ReservationForm from './components/ReservationForm';
import UserManagement from './components/UserManagement';
import Notifications from './components/Notifications';

function App() {
  const [view, setView] = React.useState('parking');

  const renderView = () => {
    switch (view) {
      case 'parking':
        return <ParkingSpaceList />;
      case 'reservation':
        return <ReservationForm />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <Notifications />;
      default:
        return <div>Wybierz widok</div>;
    }
  };

  return (
    <div>
      <Header setView={setView} />
      {renderView()}
    </div>
  );
}

export default App;
