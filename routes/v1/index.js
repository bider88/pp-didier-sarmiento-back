const express = require('express');

const app = express();

app.use('/v1/user', require('./user/user'));
app.use('/v1/auth', require('./auth/auth'));

module.exports = app;