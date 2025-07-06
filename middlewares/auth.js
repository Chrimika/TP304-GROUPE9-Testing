const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/auth');

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Accès refusé' });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // Stocke les infos utilisateur dans la requête
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Vérifie le rôle de l'utilisateur
exports.checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ error: 'Accès refusé : permissions insuffisantes' });
      }
      next();
    };
  };