/************************************************************************************
* WEB322 – Project (Fall 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Heeyeon Han
* Student ID: 154222194
* Course/Section: WEB322ZAA
*
************************************************************************************/

var express = require("express");
const exphbs = require('express-handlebars');
const session = require("express-session");
const fileUpload = require("express-fileupload");

//const sequelizeModule = require("sequelize");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: "./config/keys.env" });

var app = express();

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: "main"
}));

app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user;

  next();
})
app.use(fileUpload());

const generalController = require("./controllers/general");
const userController = require("./controllers/user");
const loadDataController = require("./controllers/load-data");

app.use("/", generalController);
app.use("/user/", userController);
app.use("/load-data/", loadDataController);

// const sequelize = new sequelizeModule("d8h86e89sgssvu", "agbqrjocxjlbvt", "74c4731ec2cce056124efe51ca1c2e82a3cb0c9a0b8e3492bce753c52eed8f4e", {
//   host: "ec2-54-160-35-196.compute-1.amazonaws.com",
//   dialect: "postgres",
//   port: 5432,
//   dialectOptions: {
//     ssl: { rejectUnauthorized: false }
//   }
// });


mongoose.connect(process.env.MONGO_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // console.log("Connected to the MongoDB database.")
  })
  .catch((err) => {
    // console.log(`There was a problem connecting to MongoDB ${err}`)
  });



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  // console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(function (err, req, res, next) {
  // console.log(err.stack);
  res.status(500).send("Something broke!")
})

app.use((req, res) => {
  res.status(404).send("Page Not Found");
})

app.listen(HTTP_PORT, onHttpStart);

