var mongoose = require('mongoose');
var validUrl = require('valid-url');

mongoose.connect('mongodb://' + process.env.ID + ':' + process.env.PW + '@ds131914.mlab.com:31914/shorturl');
var urlSchema = new mongoose.Schema({
  url: String,
  short: Number
});
var Urlmodel = mongoose.model("URL", urlSchema);

function parseURL(url, res) {
  //does the url already exist in the database? return if so
  //Url.find(etc)
  
  //if not - is it a valid url?
  if (validUrl.isUri(url)) {
    //yes - add url to database and return json
    //need to generate unique IDs for the 'short' property
    //currently using 1 as a placeholder
    var newUrl = Urlmodel({url: url, short: 1}).save(function(err, data) {
      if (err) throw err;
      console.log('saved ' + url);
      res.send(JSON.stringify({original_url: data.url, short_url: data.short}));
    })
    
  } else {
    //no - return error
    res.send(JSON.stringify({error: "URL invalid"}));
  }
  
}
  
function retreiveURL() {
  console.log("this will retreive an existing URL");
}

module.exports.parseURL = parseURL;
module.exports.retreiveURL = retreiveURL;