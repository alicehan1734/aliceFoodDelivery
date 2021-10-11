let dosayHello = function (name) {
  var str = "Hello " + name;

  return str;
}

module.exports.sayHello = function (name) {
  var str = dosayHello(name);


  return str;

}