var express = require('express');
var router = express.Router();
var userinuse = '';
/* GET home page. */
router.get('/', ensureAuthenticatedUser, function(req, res, next) {
  res.render('index', {
    title: 'Home',
    user: userinuse
  });
});

function ensureAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    userinuse = "-" + req.user.name;
    return next();
  } else {
    userinuse = '';
    return next();
  }
}

module.exports = router;
