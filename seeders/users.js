const mongoose = require('mongoose');
const User = require('../models/User');

const users = [
  { email: 'admin@propelize.com', password: 'admin123', role: 'admin' },
  { email: 'user@propelize.com', password: 'user123' }
];

async function seedUsers() {
  try {
    await mongoose.connect('mongodb://admin:admin123@localhost:27017/vehicleDB?authSource=admin');
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.connection.close();
  }
}

seedUsers();
