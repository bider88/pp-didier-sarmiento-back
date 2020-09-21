
const router = require('express').Router();

// const mongoose = require('mongoose');

const { verifyToken } = require('../../../middleware/auth');
const { userExist } = require('../../../middleware/user');

const User = require('../../../models/user');

router.all('/*', verifyToken );

router.get('/', (req, res) => {

  const name = req.query.name;
  const hobby = req.query.hobby;

  const regexName = new RegExp(name, 'i');
  const regexHobby = new RegExp(hobby, 'i');
  
  const query = name || hobby ? { $and: [] } : null;
  
  if (name) {
    query['$and'].push({ firstName: regexName });
  }
  if (hobby) {
    query['$and'].push({ hobby: regexHobby });
  }

  User.find(query)
    .exec((error, usersDB) => {
      if (error) return handleError(res, 500, error);
      res.json({
        ok: true,
        data: usersDB
      });
    });


});

router.delete('/:id', userExist, (req, res) => {

  const { id } = req.params;

  User.findByIdAndDelete(id, (error, userDeleted) => {
    if (error) return handleError(res, 500, error);
    
    res.json({
      ok: true,
      data: userDeleted
    });
  });


});

router.get('/group', (req, res) => {

  const query = { $and: [ {age: { $gte: 18 } }, { genre: 'male' } ] };

  User.find(query)
  .sort('hobby')
  .exec((error, usersDB) => {
    if (error) return handleError(res, 500, error);

    const data = usersDB.length ? 
      usersDB.map(user => ({firstName: user.firstName, phone: user.phone, hobby: user.hobby})) : [];

    res.json({
      ok: true,
      data
    });
  });

});

module.exports = router;