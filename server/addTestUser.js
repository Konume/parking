/**const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/users'); // Upewnij się, że ścieżka jest poprawna

require('dotenv').config();

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/parking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.log('Błąd połączenia z MongoDB:', err));

const addTestUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('qaz123', 10); // Hashowanie hasła

    const user = new User({
      name: 'Zuzanna',
      email: 'zs*///@example.com',
    //  password: hashedPassword,
     // role: 'admin',
   // });

  /**   await user.save();
    console.log('Testowy użytkownik został dodany.');
    process.exit();
  } catch (error) {
    console.error('Błąd podczas dodawania użytkownika:', error.message);
    process.exit(1);
  }
};

addTestUser(); */
