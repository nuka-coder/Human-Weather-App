const port = 3000;
const express = require("express");
const app = express();

// Using dotenv to manage your ENV variable in NodeJS
require("dotenv").config();
//process.env.variableName
let greet = process.env.GREET;
//method provided by express, what should happen when the browser makes a GET request
app.use(logger);

app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  console.log(greet);
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
