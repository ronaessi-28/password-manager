const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['gmail', 'app'], required: true },
    account: { type: String, required: true },
    password: { type: String, required: true } // Encrypt this before saving
});

module.exports = mongoose.model('Password', passwordSchema);
