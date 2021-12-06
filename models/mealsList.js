const mongoose = require("mongoose");
const schema = mongoose.Schema;


const mealSchema = new schema({
  title: {
    type: String,
    required: true
  },
  included: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  serv: {
    type: Number,
    required: true
  },
  calperServ: {
    type: Number,
    required: true
  },
  img: {
    type: String,
  },
  top: {
    type: Boolean,
    required: true
  },
  dataCreated: {
    type: Date,
    default: Date.now()
  }
});

const mealModel = mongoose.model("meal", mealSchema);

module.exports = mealModel;


// var meals = [
//   {
//     title: "Homemade Supreme Pizza",
//     included: "Pizza sauce, mozzarella, bacon, onion, beef mince, capsicum, pepperoni, mushroom, olives",
//     desc: "very delicious",
//     category: "Classic Meals",
//     price: 30.00,
//     time: 22,
//     serv: 2,
//     calperServ: 750,
//     img: "./images/ingredient1.jpg",
//     top: true,
//     top: "breakfast"
//   }
// ];


// module.exports.getAllMeals = function () {
//   return meals;

// };

// module.exports.getTopMeals = function () {
//   var filtered = [];


//   for (var i = 0; i < meals.length; i++) {

//     if (meals[i].top) {
//       filtered.push(meals[i]);
//     }

//   }

//   return filtered;
// }

// const getMeals = function (cat) {
//   var filtered = {
//     categoryName: cat,
//     mealkits: []
//   };

//   for (var i = 0; i < meals.length; i++) {

//     if (meals[i].category == cat) {
//       filtered.mealkits.push(meals[i]);
//     }

//   }

//   return filtered;
// // }

// let categories = [];

// module.exports.getSeperateMeals = function () {


//   mealModel.find().then(data => {

//     for (i = 0; i < data.length; i++) {

//       let currentThing = data[i];
//       let categoryName = currentThing.category;

//       let category = categories.find(c => c.categoryName == categoryName);


//       if (!category) {
//         category = {
//           categoryName: categoryName,
//           mealkits: []
//         };

//         categories.push(category);
//       }


//       category.mealkits.push(currentThing);
//     }

//     console.log("Inside - mealList", categories);

//     return categories;

//   })

//   console.log("Outside - mealList", categories);

// }
