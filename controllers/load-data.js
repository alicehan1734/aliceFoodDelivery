
var express = require("express");
const router = express.Router();



router.get("/meal-kits", (req, res) => {

  if (req.session && req.session.user && req.session.user.isClerk) {

  } else {

  }
});

module.exports = router;



