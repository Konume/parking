const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  isOccupied: { type: Boolean, default: false },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Powiązanie z użytkownikiem
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);
