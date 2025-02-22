const authenticateToken = require('../middleware/authMiddleware');
const ParkingSpace = require('../models/ParkingSpace');
const User = require('../models/users'); 
module.exports = (app) => {
  // Pobieranie miejsc parkingowych
  app.get('/api/parkingSpaces', async (req, res) => {
    try {
      const spaces = await ParkingSpace.find().populate('reservedBy', 'name email'); // Pobranie wszystkich miejsc
      res.json(spaces); // Zwrócenie miejsc parkingowych w odpowiedzi
    } catch (error) {
      res.status(500).json({ message: 'Błąd przy pobieraniu miejsc.' });
    }
  });

  // Rezerwowanie miejsca parkingowego
  app.post('/api/reserve', authenticateToken, async (req, res) => {
    const { parkingId } = req.body; // Oczekujemy ID miejsca i ID użytkownika
    const userId = req.user.id; // Zakładając, że `authenticateToken` dodaje użytkownika do `req.user`

    try {
      const user = await User.findById(userId); // Pobranie użytkownika
      if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });

      const space = await ParkingSpace.findOne({ id: parkingId }); // Pobranie miejsca
      if (!space) return res.status(404).json({ message: 'Miejsce nie istnieje.' });

      if (space.isOccupied) return res.status(400).json({ message: 'Miejsce jest już zajęte.' });

      space.isOccupied = true; // Zajmowanie miejsca
      space.reservedBy = user._id;
      await space.save(); // Zapisanie zmian w bazie danych

      res.json({ message: `Miejsce ${parkingId} zostało zarezerwowane przez użytkownika ${user.name}.` });
    } catch (error) {
      res.status(500).json({ message: 'Błąd przy rezerwowaniu miejsca.' });
    }
  });

  // Anulowanie rezerwacji miejsca parkingowego
  app.post('/api/parking-spaces/:id/cancel', authenticateToken, async (req, res) => {
    const parkingId = req.params.id; // Przechwycenie ID miejsca parkingowego z URL
    const userId = req.user.id; // Zakładając, że `authenticateToken` dodaje użytkownika do `req.user`

    try {
      const space = await ParkingSpace.findOne({ id: parseInt(parkingId) }); // Pobranie miejsca
      if (!space) return res.status(404).json({ message: 'Miejsce nie zostało znalezione.' });

      // Jeśli miejsce nie jest zajęte, nie trzeba anulować rezerwacji
      if (!space.isOccupied) return res.status(400).json({ message: 'To miejsce parkingowe nie jest zajęte.' });

      // Jeśli rezerwacja należy do innego użytkownika, nie można anulować rezerwacji
      if (space.reservedBy.toString() === userId && req.user.role === 'admin') {
        return res.status(403).json({ message: 'Nie masz uprawnień do anulowania tej rezerwacji.' });
      }

      // Anulowanie rezerwacji
      space.isOccupied = false;
      space.reservedBy = null;
      await space.save(); // Zapisanie zmian w bazie danych

      res.json({ message: `Rezerwacja miejsca ${parkingId} została anulowana.` });
    } catch (error) {
      res.status(500).json({ message: 'Błąd podczas anulowania rezerwacji.' });
    }
  });
};
