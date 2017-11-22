const express = require('express');
const app = express(); //server-app

app.use(express.static('client')); // client

// global for all routes -------------------------
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});

// -----------------------------------------------
//route handling is delegated to:
var list = require('./list.js');
app.use('/todolist/list/', list);

var item = require('./item.js');
app.use('/todolist/item/', item);

var users = require('./users.js');
app.use('/todolist/users/', users);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000!');
});

/*var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server listening on port 3000!');
});*/

