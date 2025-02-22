const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require('../models/users');

// Funkcja do weryfikacji tokenu
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Brak tokena, autoryzacja odmówiona.' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Nieprawidłowy token.' });
  }
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Brak uprawnień.' });
  }
  next();
};

module.exports = (app) => {
  // Logowanie użytkownika
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Nieprawidłowe dane logowania.' });
      }

      console.log('Hasło z formularza:', password);
      console.log('Hasło zapisane w bazie:', user.password);

      // Porównanie haseł przy użyciu tej samej soli bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Porównanie bcrypt:', password, user.password, isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: 'Nieprawidłowe hasło.' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
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
  app.put('/api/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;
    const mongoose = require('mongoose');

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Niepoprawne ID użytkownika.' });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
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

      console.log('Hasło przed haszowaniem:', password);  // Logowanie hasła przed haszowaniem
      const salt = await bcrypt.genSalt(10);
      // Haszowanie hasła przy użyciu tej samej wersji bcrypt (np. 10 rund)
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log('Nowy hash przed zapisem:', hashedPassword);  // Logowanie hasła po haszowaniu

      const newUser = new User({
        name,
        email,
        password, // Przechowujemy hasło jawne, haszowanie wykona model
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
  app.get('/api/users', verifyToken, async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Błąd przy pobieraniu użytkowników:', error);
      res.status(500).json({ message: 'Błąd przy pobieraniu użytkowników.' });
    }
  });

  // Usuwanie użytkownika
  app.delete('/api/users/:id', verifyToken, checkRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
      }

      await User.findByIdAndDelete(id);

      res.json({ success: true, message: 'Użytkownik został usunięty.' });
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
      res.status(500).json({ success: false, message: 'Błąd przy usuwaniu użytkownika.' });
    }
  });

};

