const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false },
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;
