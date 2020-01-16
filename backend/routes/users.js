const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', function(req, res, next) {
  passport.authenticate('ldapauth', { session: false }, function(
    err,
    user,
    info
  ) {
    //console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({
        success: false,
        message: `authentication failed ${info.message}`
      });
    }
    return res.send({ success: true, message: 'authentication succeeded' });
  })(req, res, next);
});

module.exports = router;
