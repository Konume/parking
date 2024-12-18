require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Backend API (Express)
const app = express();
console.log('MongoDB URI:', process.env.MONGO_URI); 
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/parking';
// Middleware
app.use(cors()); // Umożliwia CORS
app.use(bodyParser.json()); // Parsowanie JSON

// MongoDB Connection
mongoose.connect(mongoUri)
.then(() => console.log('Połączono z MongoDB'))
.catch((err) => console.log('Błąd połączenia z MongoDB:', err));
// Modele i API Routes
require('./routes/parking')(app);
require('./routes/user')(app);


// Obsługa plików statycznych React (dla produkcji)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Uruchomienie serwera
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Dodaj to do pliku server.js
