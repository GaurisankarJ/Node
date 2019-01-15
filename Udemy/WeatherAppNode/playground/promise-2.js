const request = require("request");

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://localhost:3000/location_data?address=${address}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject(error);
            } else {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress("Hello World!").then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});