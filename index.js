//runs the app 

// Import express 

const express = require('express') 
const homerouter = require('./routes/homerouter')
// Set your app up as an express app 
const app = express() 
const handlebars = require('express-handlebars')
app.use(express.static('public'))
app.engine(
    'hbs',
    handlebars.engine({
        defaultlayout: 'main',
        extname: 'hbs'
    })
)
app.set('view engine', 'hbs')
app.use(homerouter)
// Tells the app to listen on port 3000 and logs that information to the console. 
app.listen(3000, () => { 
    console.log('works') 
});