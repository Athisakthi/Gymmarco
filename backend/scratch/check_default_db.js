const mongoose = require('mongoose');
require('dotenv').config();

// Try connecting to the default database (usually 'test' if not specified in URI)
// We'll strip the /gymmarco from the URI to see what's in the default DB
const baseUri = process.env.MONGO_URI.replace('/gymmarco', '/');

async function checkDefaultDB() {
    try {
        await mongoose.connect(baseUri);
        console.log('Connected to Base URI (Default DB)');
        
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections in Default DB:', collections.map(c => c.name));
        
        for (const coll of collections) {
            const count = await db.collection(coll.name).countDocuments();
            console.log(`Collection [${coll.name}] has ${count} documents`);
            if (count > 0) {
                const sample = await db.collection(coll.name).findOne();
                console.log(`Sample from [${coll.name}]:`, JSON.stringify(sample, null, 2));
            }
        }
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDefaultDB();
