const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String, required: false }, // Optional field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'signup' }); // Explicitly set collection name to 'signup'

module.exports = mongoose.model('Signup', signupSchema);
