const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

const vehicles = [
  { make: 'Toyota', model: 'Corolla', year: 2022, type: 'Sedan', pricePerDay: 50 },
  { make: 'Ford', model: 'F-150', year: 2021, type: 'Truck', pricePerDay: 80 },
  { make: 'Tesla', model: 'Model 3', year: 2023, type: 'Electric', pricePerDay: 100 }
];

mongoose.connect('mongodb://localhost:27017/vehicleDB')
  .then(async () => {
    await Vehicle.deleteMany({}); // Nettoyer la collection
    await Vehicle.insertMany(vehicles); // Insérer les données
    console.log('Database seeded!');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));