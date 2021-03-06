const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
var express = require("express");
const router = express.Router();
const path = require("path");

router.get("/signup", (req, res) => {
  res.render("user/signup");
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




  //if success with passed == true
  if (passed) {


    userModel.findOne({
      email: email
    })
      .then(user => {


        if (user == null) {
          //console.log(`Email is not existed`);

        } else {
          validation.email = "Email already used. Please choose a different email"

          res.render("user/signup", {
            values: req.body,
            validation
          })

          return;

        }

      })
      .catch(err => {


        return;

      });

    const user = new userModel({
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email
    });

    user.save()
      .then((userSaved) => {

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
          Please be in touch us if you have any questions.<br><br>
    
          Your sign up information,<br><br>
    
          Your Full Name: ${firstName} ${lastName}<br>
          Your Email Address: ${email}<br><br>
    
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

            //welcome page 
            res.render("user/welcome", {
              fullName: `${firstName} ${lastName}`,
            });

          })
          .catch(err => {
            //console.log(`Error ${err}`);

            res.render("user/signup", {
              values: req.body,
              validation
            });
          });


        //console.log(`User ${userSaved.firstName} has been added to the database.`);

        // let uniqueName = `profile-pic-${userSaved._id}${path.parse(req.files.profilePic.name).ext}`;

        // req.files.profilePic.mv(`public/profile-picture/${uniqueName}`)
        //   .then(() => {
        //     userModel.updateOne({
        //       _id: userSaved._id
        //     }, {
        //       profilePic: uniqueName
        //     })
        //       .then(() => {
        //         console.log(userSaved._id);
        //         console.log("User document was updated with the profile picture.");
        //         res.redirect("/");
        //       })
        //       .catch(err => {
        //         console.log(`Error updating the user's profile picture ... ${err}`);
        //         res.redirect("/");
        //       })
        //   });

      })
      .catch((err) => {
        //console.log(`Error adding user to the database ... ${err}`);
        res.redirect("/");
      });

  } else {
    res.render("user/signup", {
      values: req.body,
      validation
    })
  }
});


router.get("/login", (req, res) => {
  res.render("user/login");
});


router.post("/login", (req, res) => {
  const { email, password, radio } = req.body;

  let passed = true;
  let validation = {};
  let errors = [];
  let passwordErr = [];

  //console.log(req.body);

  if (email.trim().length === 0) {

    passed = false;
    validation.email = "Please enter your email address."
  }

  if (password.trim().length === 0) {

    passed = false;
    validation.password = "Please enter your password."
  }


  if (passed) {

    userModel.findOne({
      email: email
    })
      .then(user => {
        if (user) {

          bcrypt.compare(password, user.password)
            .then(isMatched => {

              if (isMatched) {

                req.session.user = user;

                req.session.isClerk = radio === "clerk";

                if (!req.session.isClerk) {

                  //console.log("user is customer")
                  res.redirect("/user/customer/dashboard");

                } else {
                  //console.log("user is clerk")
                  res.redirect("/user/clerk/dashboard");
                }

              }
              else {
                //console.log("Passwords do not match.");
                errors.push("Wrong passord. Try again or click Forgot password to reset it. ???? ");
                //errors.push("Sorry, you entered an invalid email and/or password");

                passwordErr.push("????????")

                res.render("user/login", {
                  errors,
                  passwordErr,
                  values: req.body,

                });
              }
            })
            .catch(err => {

              // console.log(`Unable to compare passwords ... ${err}`);
              errors.push("Oops, something went wrong.");

              res.render("user/login", {
                values: req.body,
                errors
              });
            });

        }
        else {

          // console.log("User not found in the database.");
          errors.push("Couldn't find your Account ????");

          //errors.push("Sorry, you entered an invalid email and/or password");

          res.render("user/login", {
            values: req.body,
            errors
          });
        }
      })
      .catch(err => {

        //console.log(`Error finding the user in the database ... ${err}`);
        errors.push("Oops, something went wrong.");

        res.render("user/login", {
          errors
        });
      });

  } else {
    res.render("user/login", {
      values: req.body,
      validation
    })
  }
});



router.get("/welcome", (req, res) => {

  res.render("/user/welcome", {
    fullName: "",
  });

});

router.get("/password", (req, res) => {

  res.render("user/password");

});


router.post("/password", (req, res) => {
  const { email, validationCode, newPw, verifyPw } = req.body;

  let passed = true;
  let validation = {};

  if (validationCode == undefined) {
    userModel.findOne({
      email: email
    })
      .then(user => {

        if (user) {
          validation.email = "the validation code be sent.. Please check mail box !"
          validation.emailCheck = true;

          //email change
          req.session.changeEmail = email;

          //generate random code 
          let code = (Math.random() + 1).toString(5).substring(2);
          req.session.changeEmailCode = code;

          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

          const msg = {
            to: email,
            from: 'hhan34@myseneca.ca',
            subject: 'Email Verification sent by Alice Food Delivery',
            html:
              `
            Dear Customer,<br>
            <br> 
            Here is your verification email.<br><br>
            The code is ${code}<br><br>
      
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

              res.render("user/password", {
                values: req.body,
                validation
              })

              return;
            })
            .catch(err => {
              //console.log(`Error ${err}`);

              res.render("user/signup", {
                values: req.body,
                validation
              });
            });



        } else {
          validation.email = "Email's not existed.. "

          res.render("user/password", {
            values: req.body,
            validation
          })

          return;
        }
      })
      .catch(err => {

        //console.log(`We don't have matched email yet, ${err}`);

        return;

      });
  } else {
    validation.emailCheck = true;

    var passwordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,12}$/;

    if (!(newPw && verifyPw && validationCode)) {
      validation.email = "Please fill it in the form."

    } else {

      if (!passwordValid.test(newPw)) {
        validation.password = "Please enter a valid password  between 6 to 12 characters (It should cotain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.) "

      } else {
        if (newPw != verifyPw) {
          validation.email = "New Password and Verify password are not matched together."
        } else {

          if (validationCode != req.session.changeEmailCode) {
            validation.email = "Validation code is different. Please check email again."
          } else {

            //success at all 

            var query = { 'email': req.session.changeEmail };

            userModel.updateOne(query, { 'password': validation.password }, { upsert: true }, function (err, doc) {
              if (err) return res.send(500, { error: err });
              // console.log("success");

              return res.send('Succesfully saved.');
            });



          }
        }
      }

    }

    res.render("user/password", {
      values: req.body,
      validation
    })


  }


});

//logout and destroy session / clear the session from memory 
router.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/user/login");

})

router.get("/dashboard", (req, res) => {

  if (req.session.isClerk == undefined) {
    res.render("general/error");

  } else {
    if (req.session.isClerk) {
      // clerk dashboard

      res.render("user/clerk/clerkDashboard");

    } else {
      //customer dashboard
      res.render("user/customer/customerDashboard");
    }
  }

})


//logout and destroy session / clear the session from memory 
router.get("/clerk/dashboard", (req, res) => {

  if (req.session.isClerk == undefined) {
    res.render("general/error");

  } else {
    if (req.session.isClerk) {
      // clerk dashboard

      res.render("user/clerk/clerkDashboard");

    } else {
      //customer dashboard
      res.render("general/error");
    }
  }

})

//logout and destroy session / clear the session from memory 
router.get("/customer/dashboard", (req, res) => {

  if (req.session.isClerk == undefined) {
    res.render("general/error");

  } else {
    if (req.session.isClerk) {
      // clerk dashboard
      res.render("general/error");

    } else {
      //customer dashboard

      res.render("user/customer/customerDashboard");

    }
  }

})



module.exports = router;
