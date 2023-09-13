const path = require("path");
const { create_connection } = require("./back-end/mongodb");
const app = require('./app');
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
});
require("dotenv").config({path: path.resolve(__dirname,".env")});

// Connect to database
create_connection();
