// Note : XMLHttpRequest is a built-in object in web browsers.
// It is not distributed with Node; you have to install it separately.


    "use strict" // Avoids hoisting of variables

    if ((typeof process !== 'undefined') && (process.release.name === 'node')) // Checks if it is running in node process and includes xmlhttprequest via a call to a function require
    {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    }

    var request = new XMLHttpRequest(); // creates a new xmlhttprequest object

    request.open("GET", "https://restcountries.eu/rest/v2/all",true) // Configures the GET-request for the URL , does not open connection

    request.send(); // Opens the connection and sends the request to server

    // Called after receiving the response
    request.onload = function()
    {
        
        // Returns an array of objects and each object contains country name, region, sub region etc. all the details of the country
        let data = JSON.parse(this.responseText)
        
        // Traverse data array and print name, capital, and flag url of each country object
        data.forEach(element => {
            console.log("Country Name:",element.name,",Capital:",element.capital,",Flag URL:",element.flag)
        });
        
    }
    
