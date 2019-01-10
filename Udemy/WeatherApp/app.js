const request = require("request");

request({
  url:
    "https://maps.googleapis.com/maps/api/geocode/json?address=Padamughal,%20Kochi,%20Kerala%20682037&key=AIzaSyA3s19w7EkQi0xOLdZGKQmdFH7-1_2Mtq0",
    json: true
}, (error, response, body) => {
    if(error) {
        console.log(error);
    } else {
        // console.log(JSON.stringify(body, undefined, 4));
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
});