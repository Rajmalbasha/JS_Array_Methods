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

            // Returns an new array of country objects whose population is less than two lakhs
            const getCountryObjectsBasedOnPopulation = data.filter((item) => {
                return item.population < 200000
            })

            // Map returns an new array with the results of calling a function for every array element
            // Here the function returns an new string array of all the country names
            const getCountryNames = getCountryObjectsBasedOnPopulation.map((item)=>{
                return item.name
            })

            console.log(getCountryNames)
        }
        
    }
    // handles non-HTTP error like network down
    request.onerror = function()
    {
        console.log("Request couldn’t be made, might be due to network down ");
    };
       
