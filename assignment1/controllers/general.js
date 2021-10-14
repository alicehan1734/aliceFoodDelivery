const mealsModel = require('../models/mealsList.js')
const infoModel = require('../models/infoList.js')


var express = require("express");
const router = express.Router();


router.get("/", (req, res) => {

  res.render("general/home", {
    topMeals: mealsModel.getTopMeals(),
    info: infoModel.getAllinfo()
  });

});

router.get("/menu", (req, res) => {
  res.render("general/menu");

});

router.get("/signup", (req, res) => {
  res.render("general/signup");
});

router.get("/login", (req, res) => {
  res.render("general/login");
});

module.exports = router;
