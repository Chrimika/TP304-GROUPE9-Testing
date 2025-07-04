const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Vehicle Service API is running!');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Connexion MongoDB (ajoute cette ligne avant app.listen)
mongoose.connect('mongodb://localhost:27017/vehicleDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Connection error:', err));
