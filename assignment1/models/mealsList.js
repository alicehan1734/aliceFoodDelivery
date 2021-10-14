var meals = [
  {
    title: "Homemade Supreme Pizza",
    included: "Pizza sauce, mozzarella, bacon, onion, beef mince, capsicum, pepperoni, mushroom, olives",
    desc: "very delicious",
    category: "Classic Meals",
    price: 30.00,
    time: 22,
    serv: 2,
    calperServ: 750,
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
    time: 23,
    serv: 2,
    calperServ: 920,
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
    time: 12,
    serv: 2,
    calperServ: 1000,
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
    time: 8,
    serv: 3,
    calperServ: 500,
    img: "./images/ingredient4.jpg",
    top: false,
    type: "breakfast"
  },
  {
    title: "Yonge Burger",
    included: "Ground beef, egg, beaten, dry bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, garlic, minced",
    desc: "very delicious",
    category: "Classic Meals",
    price: 55.2,
    time: 34,
    serv: 1,
    calperServ: 940,
    img: "./images/ingredient5.jpg",
    top: true,
    type: "breakfast"
  },


];


module.exports.getAllMeals = function () {
  return meals;

};

module.exports.getTopMeals = function () {
  var filtered = [];


  for (var i = 0; i < meals.length; i++) {

    if (meals[i].top) {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}

module.exports.getClassicMeals = function () {
  var filtered = [];

  for (var i = 0; i < meals.length; i++) {

    if (meals[i].category == "Classic Meals") {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}


module.exports.getEasyMeals = function () {
  var filtered = [];

  for (var i = 0; i < meals.length; i++) {

    if (meals[i].category == "Easy Prep Meals") {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}


module.exports.getLowCarbMeals = function () {
  var filtered = [];

  for (var i = 0; i < meals.length; i++) {

    if (meals[i].category == "Clean15 (Low carb)") {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}


module.exports.getVegiMeals = function () {
  var filtered = [];

  for (var i = 0; i < meals.length; i++) {

    if (meals[i].category == "Vegetarian Meals") {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}


module.exports.getFamilyMeals = function () {
  var filtered = [];

  for (var i = 0; i < meals.length; i++) {

    if (meals[i].category == "Family-Style Meals") {
      filtered.push(meals[i]);
    }

  }

  return filtered;
}
