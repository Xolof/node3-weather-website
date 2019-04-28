const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// För att nodemon ska registrera förändringar
// i handlebars kör: nodemon src/app.js -e js, hbs
// (fick det ej att funka, får kolla på det sen)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Olof Johansson',
        forecast: 'cloudy',
        location: 'Åstorp'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Olof Johansson'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address){
        return res.send({
            error: "You must provide an adress!"
        })
    }

    geocode(address, (error, data = {}) => {
        const { latitude, longitude, location } = data;
        if (error) {
            return res.send({ error });
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address,
                    name: 'Olof Johansson'
                });
            })
    });
});


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'Click on "Weather" to see the forecast',
        name: 'Olof Johansson'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Olof Johansson',
        errorMessage: "Help article not found!"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Olof Johansson',
        errorMessage: "Sorry, we could'nt find that page!"
    });
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port + '!');
});