const request = require("request");

var geocodeAddress = (address, callback) => {
    //Encoding URI Components
    var encodedAddress = encodeURIComponent(address);
    //Decoding URI Components
    var decodedAddress = decodeURIComponent(encodedAddress);

    request({
        url: `http://localhost:3000/location_data?address=${decodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback(error);
        } else {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            // console.log(JSON.stringify(body, undefined, 4));
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;