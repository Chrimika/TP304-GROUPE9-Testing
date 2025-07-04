// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Route de test
app.get('/', (req, res) => {
  res.send('Backend prêt pour le TP !');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});