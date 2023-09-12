const express = require('express');
const app = express();


const { airlines,flights_by_dDate_airline_origin_dest, flights_origin_dest,flight_by_id} = require('./controller.js');

app.get('/airlines',airlines);
app.get ('/flights-by-departure-date-airline-origin-dest',flights_by_dDate_airline_origin_dest);
app.get('/flights-origin-dest',flights_origin_dest);
app.get('/flights-by-id',flight_by_id);


module.exports = app;