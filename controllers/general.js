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
      cart.forEach(cartOrder => {
        orderTotal += cartOrder.totalprice;
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

      cart.forEach(cartOrder => {
        if (cartOrder.id == orderId) {
          found = true;
          cartOrder.qty++;
          cartOrder.totalprice = cartOrder.food.price * cartOrder.qty;

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
    res.render("general/error");
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

// Check out the user (empty the cart).
router.get("/check-out", (req, res) => {
  var message;

  if (req.session.user) {
    var cart = req.session.cart || [];

    if (cart.length > 0) {

      console.log("checking order");

      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
      console.log(req.session.user.email);

      const myJSON = JSON.stringify(cart);


      const msg = {
        to: req.session.user.email,
        from: 'hhan34@myseneca.ca',
        subject: 'Your Order of items',
        html:
          `
            Dear Customer,<br>
            <br> 
            Thank you for shopping with us. We’ll send a confirmation once your items have shipped. <br>
            Your order details are indicated below. <br><br> If you would like to view the status of your order or make any changes to it, <br> please visit Your Orders on https://senecacollegewebworkshop.herokuapp.com/.
            
            <br><br>${myJSON}
            <br>
            

            
            Regards,<br><br>
            HeeYeon Han<br> 
            <span style="color: #E95C63;">Alice Food Delivery</span><br> 
            +1(647) 269-1734<br> 
            (Mon-Fri: 8AM-11:45PM, Sat-Sun: 9AM-8PM)<br>
            <br>
              `


      };

      sgMail.send(msg)
        .then(() => {
          console.log("success order");

          message = "Thank you for your purchase, you are now placed order.";
          req.session.cart = [];
          res.render("user/customer/shoppingCart", prepareViewModel(req, message));

          return;

        })
        .catch(err => {
          message = `Error ${err}`;
          res.render("user/customer/shoppingCart", prepareViewModel(req, message));

          return;

        });
    }
    else {
      message = "You cannot place order, there are no items in the cart.";
      res.render("user/customer/shoppingCart", prepareViewModel(req, message));

    }
  }
  else {


    message = "You must be logged in.";
    res.render("user/customer/shoppingCart", prepareViewModel(req, message));

  }

});

router.get("/shoppingCart", (req, res) => {

  res.render("user/customer/shoppingCart", prepareViewModel(req, ""))
})





module.exports = router;
