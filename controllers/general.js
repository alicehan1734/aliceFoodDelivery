const mealsModel = require('../models/mealsList.js')
const infoModel = require('../models/infoList.js')

var express = require("express");
const router = express.Router();


router.get("/", (req, res) => {

  let filtered = [];

  mealsModel.find().lean().then(data => {

    for (i = 0; i < data.length; i++) {
      if (data[i].top) {
        console.log(data[i].top)
        filtered.push(data[i]);
      }
    }

    console.log(filtered);

    res.render("general/home", {
      topMeals: data,
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
