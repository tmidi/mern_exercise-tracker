// Import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

// Inclue .env configs
require('dotenv').config();

// init Express server
const app = express();
const port = process.env.PORT || 5000;

// Passport Config
require('./config/passport')(passport);

app.use(cors());
app.use(express.json());

// DB Config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Connect to Mongo
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  connection.db.listCollections().toArray(function(err, collectionNames) {
    if (err) {
      console.log(err);
      return;
    } else {
      if (collectionNames.find(({ name }) => name === 'Configs')) {
        console.log('Configs already exists');
      } else {
        console.log('init default config collections');
        const initConfig = new Configs({
          ldap: defaultConfig.ldap
        });

        initConfig
          .save()
          .then(console.log('Added init default configs'))
          .catch(err => console.log('Error: ' + err));
      }
    }
  });
});

// Bodyparser
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Expression session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars:
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/exercises', require('./routes/exercises'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
