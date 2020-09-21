require('./config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

// Settings
const port = process.env.PORT;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN }));

// Routes
app.use('/api', require('./routes/v1'));

// Db connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;
  console.log('Online database');
});

// Starting the server
app.listen(port, () => console.log(`restserver listen on port ${port}`));