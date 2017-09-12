const express = require('express');
const controller = require('./controller');
var app = express();
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//create new shortened url
app.get("/new/*", function(req, res) {
  controller.parseURL(req.params[0], res);
});

//retrieve existing short url
app.get("/s/*", function(req, res) {
  controller.getURL(req.params[0], res);
});

app.listen(process.env.PORT);