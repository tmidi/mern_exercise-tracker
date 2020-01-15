const LdapStrategy = require('passport-ldapauth');
const adminConfigs = require('../models/configs.model');

// Load User model
// const User = require('../models/User');

// Load ldap config
// const ldap = require('defaults');

module.exports = function(passport) {
  adminConfigs.findOne({ name: 'ldap' }, function(err, res) {
    const ldap = res.ldap;
    passport.use(
      new LdapStrategy({
        server: {
          url: ldap.url,
          bindDn: ldap.bindDN,
          bindCredentials: ldap.bindPass,
          searchBase: ldap.searchBase,
          searchFilter: ldap.searchFilter
        }
      })
    );
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
