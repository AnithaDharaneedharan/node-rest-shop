// this file spining up the express app which handles request easily

const express = require('express');
const app =  express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anitha:'+ process.env.MONGO_ATLAS_PWD +'@cluster0-2jamk.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(cors()) can be used instead of below by installing the package
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-allow-methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json({});
    }
next();
})


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;