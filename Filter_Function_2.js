// Note : XMLHttpRequest is a built-in object in web browsers.
// It is not distributed with Node; you have to install it separately.

try 
{
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
catch (error) {
    console.error(error.name,error.message)
}