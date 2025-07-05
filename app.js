// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Vehicle = require('./models/Vehicle');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuration Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle API',
      version: '1.0.0',
      description: 'API pour gérer les véhicules',
    },
  },
  apis: ['./app.js'], // Fichiers à analyser
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Connexion MongoDB
mongoose.connect('mongodb://admin:admin123@mongo:27017/vehicleDB?authSource=admin')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - year
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique généré par MongoDB
 *         brand:
 *           type: string
 *           description: Marque du véhicule
 *           example: Toyota
 *         model:
 *           type: string
 *           description: Modèle du véhicule
 *           example: Corolla
 *         year:
 *           type: integer
 *           description: Année de fabrication
 *           example: 2020
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Récupère la liste des véhicules
 *     tags:
 *       - Vehicles
 *     responses:
 *       200:
 *         description: Liste des véhicules retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Erreur serveur
 */
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Récupère un véhicule par son ID
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du véhicule à récupérer
 *     responses:
 *       200:
 *         description: Véhicule trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Ajoute un nouveau véhicule
 *     tags:
 *       - Vehicles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Honda
 *               model:
 *                 type: string
 *                 example: Civic
 *               year:
 *                 type: integer
 *                 example: 2022
 *     responses:
 *       201:
 *         description: Véhicule créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Données invalides
 */
app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Met à jour un véhicule existant
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du véhicule à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Ford
 *               model:
 *                 type: string
 *                 example: Focus
 *               year:
 *                 type: integer
 *                 example: 2019
 *     responses:
 *       200:
 *         description: Véhicule mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Véhicule non trouvé
 */
app.put('/vehicles/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Supprime un véhicule par son ID
 *     tags:
 *       - Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du véhicule à supprimer
 *     responses:
 *       200:
 *         description: Véhicule supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehicle deleted
 *       404:
 *         description: Véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.delete('/vehicles/:id', async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app; // ← important pour les tests
