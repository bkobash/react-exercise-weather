var Fetch = require("whatwg-fetch");
var baseUrl = "http://api.openweathermap.org/data/2.5";

var service = {
  get: function(url) {
    // this will hit the server, when the server gets a response, do a .then()

    return fetch(baseUrl + url)
    //return fetch("http://localhost:6069/weather")
            .then(function(response) {
              // response.json ultimately gets returned to whoever called get()
              //console.log("RES: ", response);
              return response.json();
            });
  }
  /*
  post: function() { },
  put: function() { } ...

  */
}

module.exports = service;
