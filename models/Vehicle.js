const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },       // Marque (ex: "Toyota")
  model: { type: String, required: true },     // Modèle (ex: "Corolla")
  year: { type: Number, required: true },      // Année
  type: { type: String, required: true },      // Type (ex: "Sedan", "SUV")
  pricePerDay: { type: Number, required: true }, // Prix journalier
  isAvailable: { type: Boolean, default: true } // Disponibilité
});

module.exports = mongoose.model('Vehicle', vehicleSchema);