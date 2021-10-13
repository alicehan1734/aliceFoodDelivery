/*******************************************************************************
* WEB222 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca 
* Academic Policy. No part of this assignment has been copied manually or 
* electronically from any other source (including web sites) or distributed to 
* other students.
* 
* Name: Yat Ka Fung Student ID: 151520202 Date: 12 OCT 2021
*
******************************************************************************/


// an array of course objects
var courses = [
  { code: 'APC100', name: 'Applied Professional Communications', hours: 3, url: 'http://www.senecacollege.ca/' },
  { code: 'IPC144', name: 'Introduction to Programming Using C', hours: 4, url: 'https://scs.senecac.on.ca/~ipc144/' },
  { code: 'ULI101', name: 'Introduction to Unix/Linux and the Internet', hours: 4, url: 'https://cs.senecac.on.ca/~fac/uli101/live/' },
  { code: 'IOS110', name: 'Introduction to Operating Systems Using Windows', hours: 4, url: 'https://cs.senecac.on.ca/~fac/ios110' },
  { code: 'EAC150', name: 'College English', hours: 3, url: null }
];

// prototype object for creating student objects
var student =
{
  name: "",
  dob: new Date(),
  sid: "",
  program: "",
  gpa: 4.0,
  toString: function () {
    return 'Student info for ' + this.name + ': born on ' + this.dob.toLocaleDateString() +
      ', student id ' + this.sid + ', progrem ' + this.program + ', current GPA ' + this.gpa;
  }
};

/************************************************************
* Start your Part B code here. Do not change the code above.
************************************************************/
// task 1

/*****************************
* Task 1a  
*****************************/
//var newCourses = courses.pop();
//console.log(newCourses.code);

console.log(student);

//var deleted = courses.pop();
//console.log("\n\n*** Task 1 ***\n\nCourse " + deleted.code + " was delteted from the array (courses)");


// task 2

