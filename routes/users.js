var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

Device = require('../models/devices');
var User = require('../models/user');
router.get('/', ensureAuthenticatedUser, function(req, res) {
  res.render('users', {
    title: 'Profile',
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    apiKey: req.user.id

  });
});

router.get('/device', ensureAuthenticatedUser, function(req, res) {
  Device.getDeviceByUser(req.user.id, (err, device) => {
    if (err) {
      throw err;
    } else {
      res.render('users', {
        title: 'Devices',
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        apiKey: req.user.id,
        details: device
      });
    }

  });

});

router.get('/addDevices', ensureAuthenticatedUser, function(req, res) {
  res.render('users', {
    title: 'AddDevices',
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    apiKey: req.user.id
  })
});

router.post('/addDevices', ensureAuthenticatedUser, function(req, res) {
  var newDevice = new Device({
    user_key: req.body.user_key,
    metadata: {
      type: req.body.gateway_type,
      name: req.body.gateway_name
    },
    location: req.body.location,
    author: req.body.author
  });
  if (!newDevice.metadata.type || !newDevice.metadata.name || !newDevice.location ||
    !newDevice.author) {
    res.send(`The data dosen't seems to be right....!`);
  } else {
    User.getUserById(newDevice.user_key, (err, user) => {
      if (err) {
        res.send('user not found');
        console.error(err);
      } else {
        Device.addDevice(newDevice, (err, device) => {
          if (err) console.error(err);
          res.send("Your API-KEY is: " + device.id +
            "\nKeep this safe, it will be used to receive and send data on your device\nOwned by: " +
            device.author
          );
        });
      }
    });
  }
});
// Register
router.get('/register', ensureAuthenticated, function(req, res) {
  res.render('register');
});

// Login
router.get('/login', ensureAuthenticated, function(req, res) {
  res.render('login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/users');
  } else {
    //req.flash('error_msg', 'You are not logged in');
    return next();
  }
}

function ensureAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //  req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}


// Register User
router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'Unknown User'
        });
      }

      User.comparePassword(password, user.password, function(err,
        isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
