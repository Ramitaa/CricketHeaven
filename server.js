if (process.env.NODE_ENV === "production")
    require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const players = require('./routes/api/players')
const users = require('./routes/api/users')
const jokes = require('./routes/api/jokes')

const app = express()
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use routes
app.use('/api/players', players) 
app.use('/api/users', users)
app.use('/api/jokes', jokes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started on port ${port}`))
