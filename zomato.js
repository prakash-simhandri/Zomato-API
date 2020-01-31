const express = require("express");
const zomato = require("zomato");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));

app.set('views engine', 'ejs')  

app.use('/', indexRouter);
app.use('/', usersRouter);


console.log("app listening..... :)")

let servar = app.listen(8000,()=>{
})