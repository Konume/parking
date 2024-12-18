const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hasło użytkownika (szyfrowane)
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Rola użytkownika (admin / zwykły użytkownik)
});

module.exports = mongoose.model('users', userSchema);
