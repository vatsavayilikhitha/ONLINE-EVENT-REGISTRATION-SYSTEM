const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkey_eventhub_2026_secure', {
    expiresIn: '30d'
  });
};

module.exports = generateToken;
