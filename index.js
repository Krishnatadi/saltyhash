const SaltyHashSync = require('./src/synchronous/SaltyHash');
const SaltyHashAsync = require('./src/asynchronous/SaltyHash');
const saltyHashAlg = require('./src/cryptoAlgorithmsList');

module.exports = {
  SaltyHashSync,
  SaltyHashAsync,
  saltyHashAlg
};
