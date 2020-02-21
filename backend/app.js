const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
//Import Routes
const usersRoute = require('./routes/users')
const productRoute = require('./routes/products') 
const orderRoute = require('./routes/orders')
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))
app.use('/users', usersRoute)
// Middlewars
app.use('/products', productRoute)
app.use('/orders',orderRoute)

app.use('/users', (req,res,next) => {
    console.log("hey,its middleware!")
    next()
})


//Routes
app.get('/', (req,res) => {
    res.send("we are on home!!!")
})

//Connect To DB
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to DB!!"));
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established succesfully.");
// })
//Listeninf to the server
app.listen(8080)