var express = require('express');
var passport = require('passport');
var Strategy = require('passport-steemconnect').Strategy;


passport.use(new Strategy({
  authorizationURL: `https://steemconnect.com/oauth2/authorize`,
  tokenURL: `https://steemconnect.com/oauth2/token`,
  clientID: ``,
  clientSecret: ``,
  callbackURL: `http://localhost:3000/auth/oauth/oauth2/callback`,
  scope: ['offline', 'vote'],
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/oauth2',
  passport.authenticate('steemconnect'));

app.get('/auth/oauth/oauth2/callback',
  passport.authenticate('steemconnect', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.listen(3000);
