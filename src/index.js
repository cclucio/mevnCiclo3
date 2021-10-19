const express = require('express');
const morgan = require('morgan');
//const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/tasks', require('./routes/tasks'));
app.use(require('./routes/tasks'));

// static files
app.use(express.static(__dirname + '/public'));;

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});