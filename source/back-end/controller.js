const { request, response } = require("express");
const{mongo}= require("./mongodb");
// Mongoose Schemas
const Airlines = require("./airlines.schema");
const Flights = require("./flights.schema");
const { format } = require("morgan");
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
    console.log(`llego hasta aca`);
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




  function formatDateToISO(inputDate) {
    // Parseo de la fecha de entrada (mm-yyyy-dd)
    const [month, year, day] = inputDate.split('-').map(Number);
  
    // Construcción del objeto Date
    const date = new Date(year, month - 1, day); // Restamos 1 al mes porque los meses en JavaScript van de 0 a 11
  
    // Formateo de la fecha a ISO
    const isoDate = date.toISOString();
  
    return isoDate;
  }




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
    // Formateo de la fecha a ISO
    const [month, year, day] = departureDate.split('-');
    const fechaISO = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const startOfDay = new Date(fechaISO);
    const endOfDay = new Date(fechaISO);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const flights = await Flights.find({
      $and: [{
          
          DEPARTURE_DATE:{
          $gte: startOfDay,
          $lt: endOfDay, 
          }
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
    console.log(typeof departureDate);
    res.json({ result: flights });
  } catch (error) {
    res.status(500).json({ status: 'Error interno del servidor' });
  }
};





const flight_by_id = async (req, res) => {
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
  airlines,flights_origin_dest,flights_by_dDate_airline_origin_dest,flight_by_id
};

