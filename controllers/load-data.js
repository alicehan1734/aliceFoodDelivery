
var express = require("express");
const router = express.Router();
const mealModel = require("../models/mealsList");
const path = require("path");


let message = "";

router.get("/meal-kits", (req, res) => {

  console.log(req.session.user && req.session.isClerk)

  if (req.session.user && req.session.isClerk) {

    console.log("gkgk")
    mealModel.find().count({}, (err, count) => {

      if (err) {
        console.log(err);

        message = "Couldn't find: " + err;

      }
      else if (count === 0) {
        var namesToAdd = [
          {
            title: "Homemade Supreme Pizza",
            included: "Pizza sauce, mozzarella, bacon, onion, beef mince, capsicum, pepperoni, mushroom, olives",
            desc: "very delicious",
            category: "Classic Meals",
            price: 30.00,
            time: 22,
            serv: 2,
            calperServ: 750,
            img: "ingredient1.jpg",
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
            img: "ingredient2.jpg",
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
            img: "ingredient3.jpg",
            top: false,
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
            img: "ingredient4.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Yonge Burger",
            included: "Ground beef, egg, beaten, dry bread crumbs, evaporated milk, Worcestershire sauce, cayenne pepper, garlic, minced",
            desc: "very delicious",
            category: "Easy Prep Meals",
            price: 55.2,
            time: 34,
            serv: 1,
            calperServ: 940,
            img: "ingredient5.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Pecan chocolate bread and butter pudding",
            included: "Bread, eggs, sugar, chocolate buttons, milk. ",
            desc: "very delicious",
            category: "Easy Prep Meals",
            price: 12.15,
            time: 34,
            serv: 1,
            calperServ: 90,
            img: "dessert1.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Baked ricotta cake",
            included: "Unsalted butter, chilled, chopped, caster sugar, eggs, plain flour, baking powder, fresh ricotta, cream cheese, vanilla extract, Pure icing sugar, to dust",
            desc: "very delicious",
            category: "Dessert",
            price: 12.2,
            time: 34,
            serv: 1,
            calperServ: 23,
            img: "dessert2.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Pecan baklava rolls",
            included: "Pecan, cinnamon, nutmeg, fresh filo pastry, sugar, glucose syrup, cinnamon quills, lemon juice",
            desc: "very delicious",
            category: "Easy Prep Meals",
            price: 13.56,
            time: 34,
            serv: 1,
            calperServ: 44,
            img: "dessert3.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Lemon meringue pie",
            included: "Shredded coconut, Scottish shortbread biscuits, salted butter, gelatine leaf, egg, milk, lemon juice",
            desc: "very delicious",
            category: "Dessert",
            price: 11.22,
            time: 34,
            serv: 1,
            calperServ: 66,
            img: "dessert4.jpg",
            top: true,
            type: "breakfast"
          }, {
            title: "Coconut yoghurt cake",
            included: "Scottish shortbread biscuits, salted butter, gelatine leaf, egg, milk, lemon juice",
            desc: "very delicious",
            category: "Dessert",
            price: 23.1,
            time: 34,
            serv: 1,
            calperServ: 56,
            img: "dessert5.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Melt-and-mix white chocolate and ginger mud cake",
            included: "CADBURY Baking White Chocolate, butter, raising flour, plain flour, ginger, sugar",
            desc: "very delicious",
            category: "Dessert",
            price: 11.45,
            time: 34,
            serv: 1,
            calperServ: 87,
            img: "dessert6.jpg",
            top: true,
            type: "breakfast"
          },
          {
            title: "Tex-Mex Chicken Meal Prep Bowls",
            included: "Chicken, veggies, insed and drained black beans, rice",
            desc: "very delicious",
            category: "Easy Prep Meals",
            price: 30.00,
            time: 22,
            serv: 2,
            calperServ: 750,
            img: "easy1.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Vegetarian Burrito Bowl with Avocado Crema",
            included: "Roasted veggies, savory beans and a lime-garlic avocado crema top a bed of cilantro-lime rice in this hearty, healthy vegetarian burrito bowl recipe",
            desc: "very delicious",
            category: "Vegetarian Meals",
            price: 11.45,
            time: 34,
            serv: 1,
            calperServ: 87,
            img: "vegi1.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Butternut Squash Soup",
            included: "Creamy butternut squash soup made with sweet apples, garlic, and thyme is the perfect cozy, light dinner.",
            desc: "very delicious",
            category: "Vegetarian Meals",
            price: 30.00,
            time: 22,
            serv: 2,
            calperServ: 750,
            img: "vegi2.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Sesame Garlic Ramen Noodles",
            included: "Ramen noodles, ditch the seasoning packet, and use the noodles to whip up sesame garlic ramen noodles that taste restaurant-worthy but come together in about ten minutes.",
            desc: "very delicious",
            category: "Vegetarian Meals",
            price: 15.22,
            time: 12,
            serv: 2,
            calperServ: 1000,
            img: "vegi3.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Cauliflower Curry",
            included: "Cumin, Cinnamon, Yellow curry powder, Garam masala, Allspice, Coriander, Cardamom",
            desc: "very delicious",
            category: "Vegetarian Meals",
            price: 11.45,
            time: 34,
            serv: 1,
            calperServ: 87,
            img: "vegi4.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Thai Coconut Red Lentil Soup",
            included: "1 large chopped onion, Carrots, peeled, Fresh garlic, Thai red curry paste, Coconut milk, Fresh cilantro, Limes",
            desc: "very delicious",
            category: "Family-Style Meals",
            price: 15.22,
            time: 12,
            serv: 2,
            calperServ: 1000,
            img: "family1.jpg",
            top: false,
            type: "breakfast"
          },
          {
            title: "Pappardelle Pasta al Limone",
            included: "Kosher salt, egg yolk, heavy cream, Parmesan cheese, 1 lemon, pappardelle pasta, butter, salted, chopped parsley",
            desc: "very delicious",
            category: "Family-Style Meals",
            price: 12.2,
            time: 34,
            serv: 1,
            calperServ: 23,
            img: "family2.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Burst Cherry Tomato Pasta with Ricotta",
            included: "Kosher salt, cherry tomatoes, preferably mixed colors, extra-virgin olive oil, spaghetti, bucatini, garlic clove, crumbled red chili, Black pepper, whole milk ricotta cheese, parmesan cheese, basil leaves",
            desc: "very delicious",
            category: "Family-Style Meals",
            price: 11.45,
            time: 34,
            serv: 1,
            calperServ: 87,
            img: "family3.jpg",
            top: false,
            type: "breakfast"
          }, {
            title: "Gnocchi with Mushrooms and Blue Cheese",
            included: "Extra-virgin olive oil, white button mushrooms, portobello mushroom caps, Kosher salt, red onion, garlic cloves, tablespoons chopped fresh thyme, white wine, vegetable stock, heavy cream",
            desc: "very delicious",
            category: "Family-Style Meals",
            price: 30.00,
            time: 22,
            serv: 2,
            calperServ: 750,
            img: "family4.jpg",
            top: false,
            type: "breakfast"
          },
        ];

        mealModel.collection.insertMany(namesToAdd, (err, docs) => {
          if (err) {
            message = "Couldn't insert: " + er;

          }
          else {
            console.log("success");

            message = "Added meal kits to the database";

            res.render("user/clerk/loadData", {
              message: message
            });

          }
        });
      }
      else {

        message = "Meal kits have already been added to the database";

        res.render("user/clerk/loadData", {
          message: message
        });

      }

    });


  } else {
    message = "You are not authorized to add meal kits";

    res.render("user/clerk/loadData", {
      message: message
    });

  }

});


router.get("/add-data", (req, res) => {

  console.log(req.body)
  if (req.session.user && req.session.isClerk) {
    mealModel.find()
      .exec()
      .then((data) => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        data = data.reverse();

        // data = data.slice(0, 5);
        data = data.map(value => value.toObject());

        console.log(data);

        // Render the "viewTable" view with the data
        res.render("user/clerk/dataClerk", {
          data
        });
      });
  } else {
    res.render("general/error");

  }


  // if (req.session.isClerk == undefined) {
  //   res.render("general/error");
  // } else {
  //   if (req.session.isClerk) {

  //     mealModel.find()
  //       .exec()
  //       .then((data) => {
  //         // Pull the data (exclusively)
  //         // This is to ensure that our "data" object contains the returned data (only) and nothing else.
  //         data = data.map(value => value.toObject());
  //         console.log(data);
  //         // Render the "viewTable" view with the data
  //         res.render("user/clerk/dataClerk", {
  //           data
  //         });
  //       });
  //   } else {
  //     res.render("general/error");
  //   }
  // }

});

router.post("/add-data", (req, res) => {

  console.log(req.body);

  let errorMsg = "";



  if (req.body.title && req.body.included
    && req.body.mytextarea && req.body.category && req.body.price
    && req.body.time && req.body.serv && req.body.calperServ && req.files.img.name && req.body.top) {

    if (req.session.user && req.session.isClerk) {

      const meal = new mealModel({
        title: req.body.title,
        included: req.body.included,
        desc: req.body.mytextarea,
        category: req.body.category,
        price: req.body.price,
        time: req.body.time,
        serv: req.body.serv,
        calperServ: req.body.calperServ,
        img: req.body.img,
        top: req.body.top == "true" ? true : false
      })

      meal.save()
        .then((userSaved) => {

          console.log(`User ${userSaved.title} has been added to the database.`);

          let uniqueName = `profile-pic-${userSaved._id}${path.parse(req.files.img.name).ext}`;

          req.files.img.mv(`static/images/menuPictures/${uniqueName}`)
            .then(() => {

              mealModel.updateOne({
                _id: userSaved._id
              }, {
                img: uniqueName
              })
                .then(() => {
                  console.log("User document was updated with the profile picture.");
                  res.redirect("/load-data/add-data");

                })
                .catch(err => {
                  console.log(`Error updating the user's profile picture ... ${err}`);
                  res.redirect("/load-data/add-data");
                })

            });


        }).catch((err) => {
          console.log(`Error adding user to the database ... ${err}`);
          res.redirect("/load-data/add-data");
        });


    } else {
      res.render("general/error");
    }

  } else {
    errorMsg = "Please fill out all of the forms"
    console.log(errorMsg);

    mealModel.find()
      .exec()
      .then((data) => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        data = data.reverse();

        // data = data.slice(0, 5);
        data = data.map(value => value.toObject());

        // console.log(data);

        // Render the "viewTable" view with the data
        res.render("user/clerk/dataClerk", {
          values: req.body,
          data,
          errors: errorMsg
        });
      });

  }


});


router.get("/revise-menu", (req, res) => {

  if (req.session.user && req.session.isClerk) {
    mealModel.findOne({
      _id: req.query.id
    })
      .then(user => {
        res.render("user/clerk/reviseMenu", {
          values: user.toObject()
        })
      })
  } else {
    res.render("general/error");
  }



});



router.post("/revise-menu", (req, res) => {

  let validation = "";
  console.log(req.body)
  // Update the document in the collection.
  if (req.session.user && req.session.isClerk) {

    if (req.files) {
      let uniqueName = `profile-pic-${req.body.id}${path.parse(req.files.img.name).ext}`;

      console.log(uniqueName);

      req.files.img.mv(`static/images/menuPictures/${uniqueName}`)
        .then(() => {

          mealModel.updateOne({
            _id: req.body.id
          }, {
            img: uniqueName
          })
            .then(() => {
              console.log("User document was updated with the profile picture.");

            })
            .catch(err => {
              console.log(`Error updating the user's profile picture ... ${err}`);
            })

        });

    }

    // find one and update where the id is equal to the id in the body
    mealModel.findOneAndUpdate({
      _id: req.body.id
    }, {
      title: req.body.title,
      included: req.body.included,
      desc: req.body.mytextarea,
      category: req.body.category,
      price: req.body.price,
      time: req.body.time,
      serv: req.body.serv,
      calperServ: req.body.calperServ,
      top: req.body.top === "true"
    })
      .then(() => {
        console.log("User document was updated.");
        res.redirect("/load-data/revise-menu?id=" + req.body.id);
      })
      .catch(err => {
        console.log(`Error updating the user's profile picture ... ${err}`);
        res.render("general/error");
      })
  } else {
    res.render("general/error");
  }
})


module.exports = router;



