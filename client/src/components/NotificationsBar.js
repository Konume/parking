// Przykładowy model powiadomienia
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

const NotificationBar = mongoose.model('NotificationBar', notificationSchema);

module.exports = NotificationBar;
