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

  const emailValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var passwordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,12}$/;

  if (typeof firstName !== 'string' || firstName.trim().length === 0) {

    passed = false;
    validation.firstName = "Please enter your first name."
  }


  if (typeof lastName !== 'string' || lastName.trim().length === 0) {

    passed = false;
    validation.lastName = "Please enter your lastName name."
  }

  if (email.trim().length === 0) {

    passed = false;
    validation.email = "Please enter your email address."
  }
  else if (!emailValid.test(email)) {
    passed = false;
    validation.email = "Please enter a valid email address. "
  }

  if (password.trim().length === 0) {

    passed = false;
    validation.password = "Please enter your password."
  }
  else if (!passwordValid.test(password)) {
    passed = false;
    validation.password = "Please enter a valid password  between 6 to 12 characters (It should cotain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.) "
  }



  if (passed) {

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: email,
      from: 'hhan34@myseneca.ca',
      subject: 'Welcome to be our Alice Food Delivery member!',
      html:
        `
        Dear ${firstName} ${lastName},<br>
        <br> 
        Thank you for signing up to Alice Food Delivery.<br>
        We are very happy you are one of <span style="color: #E95C63;">'Alice Food Delivery'</span> family members.<br>
        Please be in touch us if you have any questions.<br> 

        Your sign up information,<br><br>

        Your Full Name: ${firstName} ${lastName}<br>
        Your Email Address: ${email}<br><br>

        Regards,<br><br>
        HeeYeon Han<br> 
        <span style="color: #E95C63;">'Alice Food Delivery'</span><br> 
        +1(647) 269-1734<br> 
        (Mon-Fri: 8AM-11:45PM, Sat-Sun: 9AM-8PM)<br>
        <br>
          `
    };

    sgMail.send(msg)
      .then(() => {
        res.render("general/welcome");
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
  const { email, password } = req.body;

  let passed = true;
  let validation = {};

  if (email.trim().length === 0) {

    passed = false;
    validation.email = "Please enter your email address."
  }

  if (password.trim().length === 0) {

    passed = false;
    validation.password = "Please enter your password."
  }


  if (passed) {
    res.send("Welcome back!")

  } else {
    res.render("general/login", {
      values: req.body,
      validation
    })
  }
});


module.exports = router;
