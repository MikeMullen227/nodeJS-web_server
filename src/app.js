const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
var userCity;

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view_engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
            title: 'Weather app',
            name: 'Mike Mullen'
    })
})
    
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Mullen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Help, I need somebody!',
        name: 'Mike Mullen'
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must enter a search term.'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        })
    }
    userCity = req.query.address
    
if(userCity) {
    geocode(userCity, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return console.log(error);
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return console.log('Error', error)
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
                console.log(location)
                console.log(forecastData)
            })
        }    
    })
    
} else {
    console.log('please enter a city name')
}


})

console.log(userCity)

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Mike Mullen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Mike Mullen'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

app.set('view engine', 'hbs')
// Dont need this root route anymore since express.static() is already serving it up
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Mike',
//         age: 38
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })



//localhost:3000

//routes
// app.com
// app.com/help
// app.com/about


