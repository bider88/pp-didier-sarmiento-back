const router = require('express').Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { handleError } = require('../../../utils/errors');
const User = require('../../../models/user');

router.post('/login', (req, res) => {

  const body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return handleError(res, 500, err);
    }

    if (!userDB) {
      return handleError(res, 401, 'Email or password are invalid');
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return handleError(res, 401, 'Email or password are invalid');
    }

    const token = createToken(userDB);

    res.json({
      ok: true,
      token,
      data: userDB
    })
  })

})

router.post('/signup', (req, res) => {

  const { body } = req;

  console.log(body);

  if (!body.password) {
    return handleError(res, 400, { message: 'Password is required' });
  }

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    age: body.age,
    genre: body.genre,
    hobby: body.hobby,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, userDB) => {
    if (err) {
      return handleError(res, 500, err);
    }

    const token = createToken(userDB);

    res.json({
      ok: true,
      token,
      data: userDB
    });
  });

});

const createToken = (userDB) => {
  return jwt.sign({
    user: userDB,
  }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });
}

module.exports = router;
