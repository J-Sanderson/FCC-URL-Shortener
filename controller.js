var mongoose = require('mongoose');
var validUrl = require('valid-url');

mongoose.connect('mongodb://' + process.env.ID + ':' + process.env.PW + '@ds131914.mlab.com:31914/shorturl');
var urlSchema = new mongoose.Schema({
  url: String,
  short: Number
});
var Urlmodel = mongoose.model("URL", urlSchema);

function parseURL(url, res) {
  //search for URL in database
  Urlmodel.findOne({url: url}, function(err, data) {
    if (err) throw err;
    //does it already exist there?
    if (data !== null) {
      res.send(JSON.stringify({original_url: data.url, short_url: data.short}));
      return;
    }
    //if not - is it a valid url?
    if (validUrl.isUri(url)) {
      //yes - add url to database and return json
      //find current highest value for 'short;
      Urlmodel.find(function(err, data) {
        if (err) throw err;
        //get highest value + 1
        var short = data[0].short + 1;
        //save to database
        var newUrl = Urlmodel({url: url, short: short}).save(function(err, data) {
          if (err) throw err;
          res.send(JSON.stringify({original_url: data.url, short_url: data.short}));
          return;
      });
      }).sort({short: -1}).limit(1);
    } else {
      //no - return error
      res.send(JSON.stringify({error: "URL invalid"}));
      return;
    }
  });
}
  
function retreiveURL() {
  console.log("this will retreive an existing URL");
}

module.exports.parseURL = parseURL;
module.exports.retreiveURL = retreiveURL;