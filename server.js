// const port = 3000;
// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');


// Using dotenv to manage your ENV variable in NodeJS
require('dotenv').config();

//method provided by express, what should happen when the browser makes a GET request
app.use(logger);

app.use(express.static(__dirname + '/public'));

//process.env.variableName
var APIKEY1 = process.env.OWM_KEY1;
var APIKEY2 = process.env.OWM_KEY2;
var GEOKEY = process.env.GEO_KEY;
console.log(process.env.OWM_KEY1);
console.log(APIKEY1);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


function logger(req, res, next) {
  console.log("You are logging");
  next();
}

app.listen(port, function(error){
  if (error) {
    console.log("Something went wrong.", error)
  } else {
  console.log("Server started on 3000");
  }
});
