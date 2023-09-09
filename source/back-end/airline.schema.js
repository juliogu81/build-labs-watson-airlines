const mongoose = require('mongoose');

const airline_schema = new mongoose.Schema({
  _id: String,
  IATA_CODE: String,
  AIRLINE: String,
});

const Airline = mongoose.model('Airline', airline_schema);

module.exports = Airline;
