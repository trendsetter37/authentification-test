// app/routes.js

module.exports = function(app, passport) {
  // homepage
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  // login
  app.get('/login', function(req, res) {
    res.render('login.html');
  });

  // process login
  // app.post('/login', blah blah passport);

  // signup
  app.get('/signup', function(req, res) {
    res.render('signup.html', {message: req.flash('signupMessage')});
  });

  // process signup
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  //profile section
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user // get the user out of session and pass template
    });
  });

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to home page
  res.redirect('/');
}
