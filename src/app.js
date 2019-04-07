const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})


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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny with 0% of rain.',
        location: 'Miami'
    })
})

//localhost:3000

//routes
// app.com
// app.com/help
// app.com/about