const express = require('express');
const app = express();

app.use('/v1/auth', require('./auth/auth'));
app.use('/v1/users', require('./user/user'));

module.exports = app;