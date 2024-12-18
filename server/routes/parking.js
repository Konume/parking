const ParkingSpace = require('../models/ParkingSpace');

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
  app.post('/api/reserve', async (req, res) => {
    const { parkingId } = req.body;

    try {
      const space = await ParkingSpace.findOne({ id: parkingId });
      if (!space) return res.status(404).json({ message: 'Miejsce nie istnieje.' });

      if (space.isOccupied) return res.status(400).json({ message: 'Miejsce jest już zajęte.' });

      space.isOccupied = true;
      await space.save();
      res.json({ message: `Miejsce ${parkingId} zostało zarezerwowane.` });
    } catch (error) {
      res.status(500).json({ message: 'Błąd przy rezerwowaniu miejsca.' });
    }
  });
};
