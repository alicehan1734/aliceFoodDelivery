const mealsModel = require('../models/mealsList.js')
const infoModel = require('../models/infoList.js')

var express = require("express");
const router = express.Router();


router.get("/", (req, res) => {

  let filtered = [];

  mealsModel.find().exec().then(data => {

    filtered = data.filter((value) => value.top);
    filtered = filtered.map((value) => value.toObject());

    res.render("general/home", {
      topMeals: filtered,
      info: infoModel.getAllinfo()
    });

  })

});

router.get("/menu", (req, res) => {

  let categories = [];

  // console.log("general", mealsModel.getSeperateMeals());
  mealsModel.find().lean().then(data => {

    for (i = 0; i < data.length; i++) {

      let currentThing = data[i];
      let categoryName = currentThing.category;
      let category = categories.find(c => c.categoryName == categoryName);

      if (!category) {

        category = {
          categoryName: categoryName,
          mealkits: []
        };

        categories.push(category);
      }

      category.mealkits.push(currentThing);

    }

    console.log(categories);

    res.render("general/menu", {
      mealsCategory: categories
    });

  })

});

module.exports = router;
