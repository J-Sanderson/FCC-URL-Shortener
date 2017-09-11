const express = require('express');
const controller = require('./controller');
var app = express();
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//create new shortened url
app.get("/new/:url", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(controller.parseURL(req.params.url)));
});

//retrieve existing short url
app.get("/:url", function(req, res) {
  //placeholder message
  res.send("This will direct you to the given URL, if there is one stored!")
});

app.listen(process.env.PORT);