function parseURL(url) {
  //does the url already exist in the database? return if so
  //if not - is it a valid url? http:// or https:// and one dot
  //create error (error: "URL invalid)
  //or pass url and add to database
  var urlObj = {
    original_url: url,
    short_url: "TBD"
  }
  return(urlObj);
}
  
function retreiveURL() {
  console.log("this will retreive an existing URL");
}

module.exports.parseURL = parseURL;
module.exports.retreiveURL = retreiveURL;