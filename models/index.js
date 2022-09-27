// Adapted from "Web Information Technologies Workshop 7"
// Accessed 27.09.2022
// Workshop 7 - Heroku and MongoDB

// Connection to MongoDb configuration.

if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Team-45-Cluster"
})

const db = mongoose.connection.on('error', err => {
    console.error(err);
    process.exit(1)
})

db.once('open', async () => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`)
    const {spawn} = require('child_process');
    const python = spawn('python', [__dirname+'/../amazonScraper.py']);
    python.stderr.pipe(process.stdout)
})

require('./user')