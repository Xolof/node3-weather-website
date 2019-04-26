const request = require('request');

const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieG9sb2YiLCJhIjoiY2p1ZTV6ZDFsMDA1ZzRicXdzcWo1dnFjayJ9.8NYrFH5ryuzYLPmTVK1Cfg&limit=1'

    request({ url, json: true}, (error, { body: { features } } ) => {
        if (error) {
            callback('Unable to connect!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find that location, try another search!', undefined);
        } else {
            const longitude = features[0].center[0];
            const latitude = features[0].center[1];
            const location = features[0].place_name;

            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }
    })
};

module.exports = geocode;