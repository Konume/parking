const authenticateToken = require('../middleware/authMiddleware');
const ParkingSpace = require('../models/ParkingSpace');
const User = require('../models/users'); // Załóżmy, że masz model User

module.exports = (app) => {
  // Pobieranie miejsc parkingowych
  app.get('/api/parkingSpaces', async (req, res) => {
    try {
      const spaces = await ParkingSpace.find();
      res.json(spaces);
    } catch (error) {
      res.status(500).json({ message: 'Błąd przy pobieraniu miejsc.' });
    }
  });

  // Rezerwowanie miejsca parkingowego
  app.post('/api/reserve', authenticateToken, async (req, res) => {
    const { parkingId } = req.body; // Oczekujemy ID miejsca i ID użytkownika
    const userId = req.user.id; // Zakładając, że `authenticateToken` dodaje użytkownika do `req.user`

    try {
      // Sprawdź, czy użytkownik istnieje
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });

      const space = await ParkingSpace.findOne({ id: parkingId });
      if (!space) return res.status(404).json({ message: 'Miejsce nie istnieje.' });

      if (space.isOccupied) return res.status(400).json({ message: 'Miejsce jest już zajęte.' });

      // Rezerwacja miejsca przez użytkownika
      space.isOccupied = true;
      space.reservedBy = user._id;
      await space.save();

      res.json({ message: `Miejsce ${parkingId} zostało zarezerwowane przez użytkownika ${user.name}.` });
    } catch (error) {
      res.status(500).json({ message: 'Błąd przy rezerwowaniu miejsca.' });
    }
  });
};
