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

router.get("/signup", (req, res) => {
  res.render("general/signup");
});

router.post("/signup", (req, res) => {
  res.json(req.body);

  const { firstName, lastName, email, password } = req.body;

  let passed = true;

  if (passed) {
    res.render("general/signup", {
      values: req.body
    })
  }
});


router.get("/login", (req, res) => {
  res.render("general/login");
});


router.post("/login", (req, res) => {

});


module.exports = router;
