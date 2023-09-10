const mongoose = require('mongoose');

const airlines_schema = new mongoose.Schema({
  IATA_CODE: String,
  AIRLINE: String,
});

const Airlines = mongoose.model('Airlines', airlines_schema);

module.exports = Airlines;
