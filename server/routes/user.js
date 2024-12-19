const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = (app) => {

  // Logowanie użytkownika
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      // Porównanie hasła
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Nieprawidłowe hasło.' });
      }

      // Generowanie tokenu JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Czas wygaśnięcia tokenu na 1 godzinę
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
      console.error('Błąd logowania:', error);
      res.status(500).json({ message: 'Błąd logowania.' });
    }
  });

  // Edytowanie użytkownika
  app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      // Aktualizacja danych użytkownika
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      await user.save();

      res.json({ message: 'Dane użytkownika zostały zaktualizowane.', user });
    } catch (error) {
      console.error('Błąd przy edytowaniu użytkownika:', error);
      res.status(500).json({ message: 'Błąd przy edytowaniu użytkownika.' });
    }
  });

  // Dodawanie użytkownika
  app.post('/api/users', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Użytkownik z takim e-mailem już istnieje.' });
      }

      // Tworzenie nowego użytkownika
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res.status(201).json({
        message: 'Użytkownik został dodany.',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error('Błąd przy tworzeniu użytkownika:', error);
      res.status(500).json({ message: 'Błąd przy tworzeniu użytkownika.' });
    }
  });

  // Pobieranie wszystkich użytkowników
  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Błąd przy pobieraniu użytkowników:', error);
      res.status(500).json({ message: 'Błąd przy pobieraniu użytkowników.' });
    }
  });

  // Usuwanie użytkownika
  app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      // Usuwanie użytkownika
      await User.findByIdAndDelete(id);

      // Odpowiedź z informacją o sukcesie
      res.json({ success: true, message: 'Użytkownik został usunięty.' });
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
      res.status(500).json({ success: false, message: 'Błąd przy usuwaniu użytkownika.' });
    }
  });

};
