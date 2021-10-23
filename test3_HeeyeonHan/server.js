/************************************************************************************
*  WEB322 – Test #3 (Fall 2021)
*  I declare that this solution is my own work in accordance with the Seneca Academic
*  Policy. No part of this test has been copied manually or electronically from
*  any other source, excluding those listed below, or distributed to other students.
*  
*  For the questions contained in this file, you may refer to the Node.js online
*  documentation, Express online documentation, HandleBars documentation, web322.ca website, 
*  and the course notes.
*  Be careful not to spend too much time looking at these references!
*
*  Name: Heeyeon Han
*  Student ID: 154222194
*  Course/Section: WEB322/ZAA
* 
************************************************************************************/

// Don't forget to install the node modules before you begin working on your solution.
// The package.json file was already included so you can simply type the terminal command:
//      npm install

const path = require("path");
const express = require("express");
const exphbs = require('express-handlebars');

// Initialize express with handlebars.
const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: ''
}));

app.set('view engine', '.hbs');

// ******** DO NOT CHANGE ANYTHING ABOVE THIS LINE (EXCEPT THE HEADER) ********



// ****** QUESTION #1 - 10 MARKS ******

// *** PART 1A - 2 Marks ***
// Create a "GET" route at the default url "/" (eg. http://localhost/)
// and send the handlebars view "home.hbs".  You must pass the array
// to the view.  You will use this array for part 1B.
app.get("/", function (req, res) {
    let dataToShow = [
        { employeeId: 111, fullName: "Cameron Gray", isManager: false },
        { employeeId: 222, fullName: "Kathy Dumanski", isManager: true },
        { employeeId: 333, fullName: "Nick Romanidis", isManager: false },
    ];

    // Insert code here
    res.render("home", {
        dataToShow
    });

});



// *** PART 1B - 8 Marks ***
// Modify the HandleBars view called "home.hbs".  In the view file you
// will design a table to list employees working at Seneca College.  The
// view file has already been started but you must fill in the blanks.
// An example of the view is available in the file "home-page-example.png"
// located in the root folder.


// ****** QUESTION #2 - 17 Marks ******

// *** PART 2A - 1 Mark ***
// Set up the form processing middleware to allow express
// the ability to parse the body of a form post.

app.use(express.json());
// *** PART 2B - 10 Marks ***
// Modify the HandleBars view called "newStudent.hbs".  In the view file you
// will design a form to add students to a program at Seneca College.  The
// view file has already been started but you must fill in the blanks.
// An example of the form is available in the file "new-student-form-example.png"
// located in the root folder.



// *** PART 2C - 1 Mark ***
// Create a "GET" route at the url "/newStudent" (eg. http://localhost/newStudent)
// and send the handlebars view "newStudent.hbs".
app.get("/newStudent", function (req, res) {

    res.render("newStudent")

});

// *** PART 2D - 5 Marks ***
// Create a "POST" route at the url "/newStudent" and return a JSON formatted string.
// The response will differ if the fullName field is valid or not.
// (HINT: your response will return a JSON literal object using res.json(...))
app.post("/newStudent", (req, res) => {
    const { fullName, studentNum, program } = req.body;

    console.log(req)
    // *** 2 Marks ***
    // Validate the fullName field.  Make sure it:
    //      - has been specified (in otherwords, it is not an empty string)
    //      - it has a minimum length of 2 characters.
    if (fullName != null && fullName.length >= 2) {
        res.json({
            message: "Student <" + fullName + "> (<" + studentNum + ">) added to the <" + program + "> program.",
        });
    } else {
        res.json({
            message: "Full name is not valid.",
        });
    }
    // *** 1 Mark ***
    // If the fullName field is *not* valid, return the JSON literal:
    //      {message: "Full name is not valid."}
    // Note: You do not need to specify what validation failed

    // *** 2 Marks ***
    // If the posted data is *valid*, return the JSON literal:
    //      {message: "Student <fullName> (<studentNum>) added to the <program> program."}.
    // Note: <fullName>, <studentNum> and <program> represent the values entered by the user.


});



// ******** DO NOT CHANGE ANYTHING BELOW THIS LINE ********

// A "route" that is invoked if no other paths are matched.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);