// const request = require("request");
const yargs = require("yargs");
const geocode = require("./geocode.js");
const weather = require("./weather.js");

var argv = yargs
    .options("address", {
        demand: true,
        alias: "a",
        describe: "Address to fetch weather for",
        string: true,
    })
    .help()
    .alias("help", "h")
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(result, undefined, 2));
        weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}.`);
            }
        });
    }
});


