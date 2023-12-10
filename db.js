// db.js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

module.exports = {
  connect: async () => {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  },
  close: async () => {
    await client.close();
    console.log('Connection to MongoDB closed');
  },
  getClient: () => client,
};
