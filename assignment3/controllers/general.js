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
  const { firstName, lastName, email, password } = req.body;

  let passed = true;
  let validation = {};


  if (typeof firstName !== 'string' || firstName.trim().length === 0) {

    passed = false;
    validation.firstName = "You must specify a first name."
  }
  else if (typeof firstName !== 'string' || firstName.trim().length < 2) {
    passed = false;
    validation.firstName = "First name should be at least 2 characters long."
  }



  if (passed) {

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: email,
      from: 'hhan34@myseneca.ca',
      subject: 'Contact Us Form Submission',
      html:
        `Vistor's Full Name: ${firstName} ${lastName}<br>
          Vistor's Email Address: ${email}<br>
          Vistor's message: ${message}<br>
          `
    };

    sgMail.send(msg)
      .then(() => {
        res.send("Success, validation passed, email sent.");
      })
      .catch(err => {
        console.log(`Error ${err}`);

        res.render("general/signup", {
          values: req.body,
          validation
        });
      });

  } else {
    res.render("general/signup", {
      values: req.body,
      validation
    })
  }
});


router.get("/login", (req, res) => {
  res.render("general/login");
});


router.post("/login", (req, res) => {

});


module.exports = router;
