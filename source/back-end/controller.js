const path = require("path");
const mongoose = require('mongoose');
const mongo = require("./mongodb");

async function main(){

    // Get global variables from .env file
    require("dotenv").config({path: path.resolve(__dirname,".env")});

    // Connect to database
    const { create_connection } = require("./mongodb");
    await create_connection();    

    
}

main();
