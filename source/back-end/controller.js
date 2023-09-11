const { request, response } = require("express");
const{mongo}= require("./mongodb");
// Mongoose Schemas
const Airlines = require("./airlines.schema");
const Flights = require("./flights.schema");
/**
 * Sample Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */




const airlines = async (req, res) => {
   /* #swagger.responses[200] = {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                    "type" : "object",
                    "properties" : {
                        "result" : {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Airline"
                            }
                        }
                    }
                }
              }
            }
        }  
        */ 
    try {
    const airlines = await Airlines.find({});
    res.json({ result: airlines });
  } catch (error) {
    res.status(500).json({ status: 'Status error' });
  }
};






const flights_origin_dest = async (req, res) => {
    /*swagger.responses[200] = {
        "description": "OK",
        "content": {
          "application/json": {
            "schema": {
                "type" : "object",
                "properties" : {
                    "result" : {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/flights"
                        }
                    }
                }
            }
          }
        }
    }   
    */ 

    const { originAirport, destinationAirport} = req.query;
  
    try {
        const flights = await Flights.find({
            ORIGIN_AIRPORT: originAirport,
            DESTINATION_AIRPORT: destinationAirport,
        });
      res.json({ result: flights });
    } catch (error) {
      res.status(500).json({ status: 'Error interno del servidor' });
    }
  };







const flights_by_departure_date = async (req, res) => {
    /*swagger.responses[200] = {
        "description": "OK",
        "content": {
          "application/json": {
            "schema": {
                "type" : "object",
                "properties" : {
                    "result" : {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/flights"
                        }
                    }
                }
            }
          }
        }
    } 
    */  
    const { departureDate } = req.query;

  try {
    const flights = await Flights.find({
      DEPARTURE_DATE: 
        new Date(departureDate) 
      ,
    });

    res.json({ result: flights });
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};





const flights_by_dDate_airline_origin_dest = async (req, res) => {
    /*swagger.responses[200] = {
        "description": "OK",
        "content": {
          "application/json": {
            "schema": {
                "type" : "object",
                "properties" : {
                    "result" : {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/flights"
                        }
                    }
                }
            }
          }
        }
    } 
    */  
    const { departureDate, airline, originAirport, destinationAirport } = req.query;

  try {
    const flights = await Flights.find({
      $and: [
        {
          DEPARTURE_DATE: 
             new Date(departureDate),
          
        },
        {
          AIRLINE: airline, // Filtrar vuelos por aerolínea
        },
        {
          ORIGIN_AIRPORT: originAirport, // Filtrar vuelos por aeropuerto de origen
        },
        {
          DESTINATION_AIRPORT: destinationAirport, // Filtrar vuelos por aeropuerto de destino
        },
      ],
    });

    res.json({ result: flights });
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};






const flights_by_dDate_airline = async (req, res) => {
    /*swagger.responses[200] = {
        "description": "OK",
        "content": {
          "application/json": {
            "schema": {
                "type" : "object",
                "properties" : {
                    "result" : {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/flights"
                        }
                    }
                }
            }
          }
        }
    } 
    */  
    const { departureDate, airline} = req.query;

  try {
    const flights = await Flights.find({
      $and: [
        {
          DEPARTURE_DATE: 
             new Date(departureDate),
          
        },
        {
          AIRLINE: airline, // Filtrar vuelos por aerolínea
        },
      ],
    });

    res.json({ result: flights });
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};






const flights_by_dDate_origin_dest = async (req, res) => {
    /*swagger.responses[200] = {
        "description": "OK",
        "content": {
          "application/json": {
            "schema": {flights
                "type" : "object",
                "properties" : {
                    "result" : {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/flights"
                        }
                    }
                }
            }
          }
        }
    } 
    */  
    const { departureDate,originAirport, destinationAirport } = req.query;

  try {
    const flights = await Flights.find({
      $and: [
        {
          DEPARTURE_DATE: 
           Date(departureDate), // Filtrar vuelos con fecha de salida igual o posterior
          
        },
        

        {
          ORIGIN_AIRPORT: originAirport, // Filtrar vuelos por aeropuerto de origen
        },
        {
          DESTINATION_AIRPORT: destinationAirport, // Filtrar vuelos por aeropuerto de destino
        },
      ],
    });

    res.json({ result: flights });
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};






const flight_by_id = async (req, res) => {

  try {
    const{id} = req.query;
    const flight = await Flights.findById(id);

    if (!flight) {
      res.status(404).json({ status: 'Vuelo no encontrado' });      // Si no se encuentra el vuelo, responder con un error 404

    } else {
      // Si se encuentra el vuelo, responder con la información del vuelo
      res.json({ result: flight });
    }
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};






module.exports = {
  airlines,flights_origin_dest,flights_by_departure_date,flights_by_dDate_airline_origin_dest,flights_by_dDate_airline,flights_by_dDate_origin_dest,flight_by_id
};

