const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./models/Contact');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const result = await Contact.updateMany({ read: { $exists: false } }, { read: true });
        console.log(`Updated ${result.modifiedCount} messages to read: true`);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
