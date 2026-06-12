const mongoose = require('mongoose');
const Signup = require('../models/Signup');
require('dotenv').config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        
        const count = await Signup.countDocuments();
        console.log('Total users in signup collection:', count);
        
        const users = await Signup.find().limit(5);
        console.log('Sample users (emails):', users.map(u => u.email));
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
