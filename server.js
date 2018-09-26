const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//set up configurations

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//'next' allows you to tell the middleware when the function is complete
app.use(function(req, res, next){
  //get current time
  var now = new Date().toString();
  var log = now + ', ' + req.method + ', ' + req.url;

  console.log(log);
  fs.appendFile('server.log', log + '\n', function(err){
    if(err){
      console.log('Error creating file');
    }
  });

  next(); //tell application to run
});

// app.use(function(req, res, next){
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});

//set up a handler for a HTTP GET request
//app.get(url, function);
//function(request, response) - stores the HTTP Request and the response
app.get('/', function(req, res) {
  //respond by sending data back to the user
  // res.send('<h1>Hello Express!</h1>');
  // res.send({name: 'Josh', likes: ['Web design', 'Music', 'Videos']});
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Hello and welcome to my website!'
  });
});

//sends 'About page' as a string if you go on localhost:3000/about
app.get('/about', function(req, res) {
  res.render('about.hbs', { //render the dynamic data (as values!!) to about.hbs file
    pageTitle: 'About page'
  });
}); //this is a basic route.

//CHALLENGE :
//create a route: /bad
//send back some JSON Data with an error message property
app.get('/bad', function(req, res) {
  res.send({
    errorMessage: 'Unable to request data.'
  });
});

//we need to get the app to start listening - or bind it to a port
//listen on localhost:3000
//app.listen(port, function)
app.listen(3000, function(){
  console.log('Server is ready!');
});
