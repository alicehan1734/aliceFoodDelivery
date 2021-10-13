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
var express = require("express");
const exphbs = require('express-handlebars');

const mealsModel = require('./models/mealsList.js')

var app = express();

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: "main"
}));

app.set('view engine', '.hbs');
var path = require("path");

// setup a 'route' to listen on the default url path
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {

  res.render("home", {
    topMeals: mealsModel.getTopMeals()
  });

});

app.get("/menu", (req, res) => {
  res.render("menu", {
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
  });
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