const mongoose = require('mongoose');
const Signup = require('./models/Signup'); // Pointing to new model
require('dotenv').config();

async function checkSignups() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const signups = await Signup.find({}, 'email name');
        console.log('Registered Signups (in signup collection):', JSON.stringify(signups, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkSignups();
