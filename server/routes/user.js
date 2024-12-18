const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      // Porównaj hasło
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Nieprawidłowe hasło.' });
      }

      // Generowanie tokenu JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Ustalamy czas wygaśnięcia tokenu na 1 godzinę
      });

      res.json({
        message: 'Zalogowano pomyślnie.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Błąd logowania:', error); // Szczegóły błędu w konsoli
      res.status(500).json({ message: 'Błąd logowania.' });
    }
  });
};
