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

  // console.log(mealsModel.getSeperateMeals());

  res.render("general/menu", {
    mealsCategory: mealsModel.getSeperateMeals()
  });
});

module.exports = router;
