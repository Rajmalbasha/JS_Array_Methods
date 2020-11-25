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
        //HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
        // Responses are grouped in five classes:
        //Informational responses (100–199)
        //Successful responses (200–299)
        //Redirects (300–399)
        //Client errors (400–499)
        //Server errors (500–599)
        if(request.status != 200)
        {
            console.error("Error: ", request.status,request.statusText)
        }
        else
        {
            // Returns an array of objects and each object contains country name, region, sub region etc. all the details of the country
            let data = JSON.parse(this.responseText)
        
            // Traverse data array and print name, capital, and flag url of each country object
            data.forEach(element => {
                console.log("Country Name:",element.name,",Capital:",element.capital,",Flag URL:",element.flag)
            });
        }
        
        
    }
    // handles non-HTTP error like network down
    request.onerror = function()
    {
        console.log("Request couldn’t be made, might be due to network down ");
    };
    
