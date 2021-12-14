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

router.get("/menu/description", (req, res) => {



  mealsModel.findOne({
    _id: req.query.id
  }).then(menu => {


    if (menu) {


      res.render("general/description", {
        values: menu.toObject()
      });

    } else {

      res.render("general/error");

    }
  })


})

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


    res.render("general/menu", {
      mealsCategory: categories
    });

  })

});

const findOrder = function (id) {
  return mealsModel.findOne({
    _id: id
  }).then(menu => {


    return menu.toObject();

  })

};

const prepareViewModel = function (req, message) {

  if (req.session && req.session.user) {

    var cart = req.session.cart || [];
    var orderTotal = 0;

    const hasOrders = cart.length > 0;

    if (hasOrders) {
      cart.forEach(cartSong => {
        orderTotal += cartSong.price * cartSong.qty;
      });
    }

    return {
      hasOrders,
      orders: cart,
      orderTotal: "$" + orderTotal.toFixed(2),
      message: message
    };
  }
  else {
    return {
      hasOrders: false,
      orders: [],
      orderTotal: "$0.00",
      message: message
    };
  }
}

router.get("/add-order/:id", async (req, res) => {
  var message;

  const orderId = req.params.id;

  if (req.session.user) {

    var food = await findOrder(orderId);

    var cart = req.session.cart = req.session.cart || [];


    if (food) {
      var found = false;

      cart.forEach(cartSong => {
        if (cartSong.id == orderId) {
          found = true;
          cartSong.qty++;
          cartSong.totalprice = cartSong.food.price * cartSong.qty;

        }
      });

      if (found) {
        message = "Food was already in the cart, incremented the quantity by one.";
      }
      else {

        cart.push({
          id: orderId,
          qty: 1,
          food: food,
          totalprice: food.price
        });

        console.log(cart);

        cart.sort((a, b) => a.food.title.localeCompare(b.food.title));

        message = "Food added to the shopping cart.";
      }
    }
    else {
      // Song is not in the database.
      message = "Food not found in the database.";
    }


  }
  else {
    // Cannot add the song because the user is not logged in.
    message = "You must be logged in.";
  }

  res.render("user/customer/shoppingCart", prepareViewModel(req, message));
});

router.get("/remove-order/:id", (req, res) => {
  var message;

  const orderId = req.params.id;

  if (req.session.user) {
    var cart = req.session.cart || [];

    const index = cart.findIndex(cartOrder => { return cartOrder.id == orderId });

    if (index >= 0) {

      message = `Removed "${cart[index].food.title}" from the cart`;
      cart.splice(index, 1);
    }
    else {
      // Song was not found in the shopping cart, nothing to do.
      message = "Food was not found in your cart.";
    }
  }
  else {
    // Not logged in
    message = "You must be logged in.";
  }

  res.render("user/customer/shoppingCart", prepareViewModel(req, message));
});


router.get("/shoppingCart", (req, res) => {

  res.render("user/customer/shoppingCart", {
    hasOrders: false,
    orders: [],
    orderTotal: "$0.0",
    message: ""
  })
})





module.exports = router;
