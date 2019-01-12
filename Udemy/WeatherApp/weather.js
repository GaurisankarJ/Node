const request = require("request");

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/1f1fd33ed48673a03a1823e2423118c4/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback(error);
        }
    });
};

module.exports.getWeather = getWeather;

