const https = require("https");
const path = require("path");
const mongoose = require('mongoose');
const { create_connection } = require("./mongodb");
const mongo = require("./mongodb");const express = require('express');
const app = express();
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
});
require("dotenv").config({path: path.resolve(__dirname,".env")});

// Connect to database
create_connection();
