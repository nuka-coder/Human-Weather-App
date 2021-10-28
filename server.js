//Express module requirement
const express = require("express");
// function that represents the express module
const app = express();
//method provided by express, what should happen when the browser makes a GET request
app.use(logger);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");//the response we send to the browser when it makes a request at the root
  console.log("Index");
});

app.get("/users", function(req, res){
  res.send("Welcome to the user page");
  console.log("User");
})


function logger(req, res, next) {
  console.log("You are logging");
  next();
}

//listen method instructs the module to listen on a specific port for any http requests sent to our server
app.listen(3000, function(){
  console.log("Server started on 3000"); //server is located on port 3000
});
