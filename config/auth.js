const jwt = require('jsonwebtoken');

module.exports = {
  ACCESS_TOKEN_SECRET: 'ton_secret_access_token',
  REFRESH_TOKEN_SECRET: 'ton_secret_refresh_token',
  generateAccessToken: (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  },
  generateRefreshToken: (user) => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }
};