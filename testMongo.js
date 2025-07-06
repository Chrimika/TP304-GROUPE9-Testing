// testMongo.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connecté à MongoDB avec succès !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Échec de connexion :', err);
    process.exit(1);
  });
