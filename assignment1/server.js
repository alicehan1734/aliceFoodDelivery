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
var express = require("express");
const exphbs = require('express-handlebars');
var path = require("path");

var app = express();

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: "main"
}));

app.set('view engine', '.hbs');
var path = require("path");

// setup a 'route' to listen on the default url path
app.use(express.static('static'));

app.get("/", (req, res) => {

  var topMeals = [
    {
      title: "Homemade Supreme Pizza",
      included: "Pizza sauce, mozzarella, bacon, onion, beef mince, capsicum, pepperoni, mushroom, olives",
      desc: "very delicious",
      category: "Classic Meals",
      price: 30.00,
      time: 25.78,
      serv: 2,
      calperServ: 890,
      img: "./images/ingredient1.jpg",
      top: true,
      type: "breakfast"
    },
    {
      title: "Mad Radish",
      included: "Eggs, green beans, Kalamata olives, tomatoes, tuna, and tangy potatoes",
      desc: "very delicious",
      category: "Classic Meals",
      price: 28.03,
      time: 25.78,
      serv: 2,
      calperServ: 890,
      img: "./images/ingredient2.jpg",
      top: true,
      type: "breakfast"
    },
    {
      title: "Pasta Pronta",
      included: "Egg for colour and richness (in some types of pasta), and possibly vegetable juice (such as spinach, beet, tomato, carrot), herbs",
      desc: "very delicious",
      category: "Classic Meals",
      price: 15.22,
      time: 25.78,
      serv: 2,
      calperServ: 890,
      img: "./images/ingredient3.jpg",
      top: true,
      type: "breakfast"
    },
    {
      title: "Tteok-bokki",
      included: "Tteok (rice cakes), fishcake, gochujang",
      desc: "very delicious",
      category: "Classic Meals",
      price: 22.23,
      time: 25.78,
      serv: 2,
      calperServ: 890,
      img: "./images/ingredient4.jpg",
      top: true,
      type: "breakfast"
    },
    {
      title: "Yonge Burger",
      included: "Ground beef, egg, beaten, dry bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, garlic, minced",
      desc: "very delicious",
      category: "Classic Meals",
      price: 55.2,
      time: 25.78,
      serv: 2,
      calperServ: 890,
      img: "./images/ingredient5.jpg",
      top: true,
      type: "breakfast"
    }
  ];

  res.render("home", {
    topMeals,
    layout: false // do not use the default layout
  });

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