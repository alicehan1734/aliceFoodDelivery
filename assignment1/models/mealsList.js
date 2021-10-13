var meals = [
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
    top: false,
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

