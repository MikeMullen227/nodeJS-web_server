const path = require('path');
const express = require('express');
const hbs = require('hbs')

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny with 0% of rain.',
        location: 'Miami'
    })
})

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