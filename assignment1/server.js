/************************************************************************************
* WEB322 – Project (Fall 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Heeyeon Han
* Student ID: 154222194
* Course/Section: WEB322ZAA
*
************************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");
const mymodule = require("./modules/mymodules.js");

var express = require("express");


var app = express();

// setup a 'route' to listen on the default url path
app.use(express.static('static'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/menu.html"))
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/signup.html"))
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"))
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!")
})

app.use((req, res) => {
  res.status(404).send("Page Not Found");
})


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);