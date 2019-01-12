const yargs = require("yargs");
const axios = require("axios");

var argv = yargs
    .options("address", {
        alias: "a",
        describe: "Address to fetch weather for",
        demand: true,
        string: true
    })
    .help()
    .alias("help", "h")
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var decodedAddress = decodeURIComponent(encodedAddress);

var geocodeURL = `http://localhost:3000/location_data?address=${decodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if(response.data.results[0].formatted_address === "ERROR") {
        throw new Error("Unable to find the address.");
    } else {
        // console.log(JSON.stringify(response.data, undefined, 2));
        console.log(`Address : ${response.data.results[0].formatted_address}`);
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        var weatherURL = `https://api.darksky.net/forecast/1f1fd33ed48673a03a1823e2423118c4/${latitude},${longitude}`;
        return axios.get(weatherURL).then();
    }
}).then((response) => {
    var temperature =  response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error) => {
    if(error.code === "ENOTFOUND") {
        console.log("Unable to connect to API servers.");
    } else {
        console.log(error.message);
    }
});