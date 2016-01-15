//require express

var express = require('express');
var app = express();
var contact = require('./routes/contact');


//require body-parser
var bodyParser= require('body-parser');

//static means css html files that are not dynamic
app.use(express.static(__dirname + "/public"));

//use bodyParser as a json format
app.use(bodyParser.json());
app.use('/contactlist', contact);


app.listen(3000);
console.log("server is running on port 3000");