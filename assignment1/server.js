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

var express = require("express");
const exphbs = require('express-handlebars');


var app = express();

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: "main"
}));

app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/static"));



app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!")
})

app.use((req, res) => {
  res.status(404).send("Page Not Found");
})


const generalController = require("./controllers/general");
const mealController = require("./controllers/meals");

app.use("/", generalController);
app.use("/", mealController);


var HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT);