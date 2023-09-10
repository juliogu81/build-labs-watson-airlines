const https = require("https");
const path = require("path");
const mongoose = require('mongoose');
const { create_connection } = require("./mongodb");
const mongo = require("./mongodb");const express = require('express');
const app = express();
const port = 8080;


const { airlines, flights_by_dDate_airline,flights_by_dDate_airline_origin_dest, flights_by_dDate_origin_dest, flights_by_departure_date, flights_origin_dest,flight_by_id} = require('./controller.js');


//GETS a la base de datos

app.get('/airlines',airlines);
app.get ('/flights-by-departure-date-airline-origin-dest',flights_by_dDate_airline_origin_dest);
app.get('/flights-by-departure-date-airline',flights_by_dDate_airline);
app.get('/flights-by-departure-date-origin-dest',flights_by_dDate_origin_dest);
app.get('/flights-by-departure-date',flights_by_departure_date);
app.get('/flights-origin-dest',flights_origin_dest);
app.get('/flights-by-id',flight_by_id);


app.listen(port, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
});
require("dotenv").config({path: path.resolve(__dirname,".env")});

// Connect to database
create_connection();
