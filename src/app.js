const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/mymongo')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index')

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

// starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});