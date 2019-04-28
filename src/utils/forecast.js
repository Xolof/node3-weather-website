const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e9132e710e5505408027dc47d5b04285/' + longitude + ',' + latitude + '?units=si&lang=sv';

    request({ url, json: true}, (error, {
         body: {
            code,
            error: err,
            hourly: { summary },
            currently: { temperature, precipProbability, summary : now } } } ) => {
        if (error) {
            callback('Could not connect to location service.', undefined);
        } else if (code === 400) {
            callback(err, undefined)
        } else {
            const prognos = summary + ' Just nu är det ' + now.toLowerCase() + '. Temperaturen är ' + temperature + ' grader C. Det är ' + precipProbability + '% sannolikhet för nederbörd.'

            callback(undefined, prognos)
        }
    })
};


module.exports = forecast;