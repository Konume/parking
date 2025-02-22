const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(403).json({ message: 'Brak tokena' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token jest nieprawidłowy' });
    }

    // Można również zapisać dane użytkownika do req.user, jeśli chcesz je używać w innych częściach kodu
    const user = await User.findById(decoded.id);
    req.user={ id: user.id, role: user.role };
    next();
  });
};

module.exports = authenticateToken;
