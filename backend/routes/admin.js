const router = require("express").Router();
let Configs = require("../models/configs.model");

router.route("/").post((req, res) => {
  Configs.find()
    .then(configs => res.json(configs))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const url = req.body.url;
  const bindDN = req.body.bindDN;
  const bindPass = req.body.bindPass;
  const searchBase = req.body.searchBase;
  const searchFilter = req.body.searchFilter;

  const newConfig = new Configs({
    "ldap.url": url,
    "ldap.bindDN": bindDN,
    "ldap.bindPass": bindPass,
    "ldap.searchBase": searchBase,
    "ldap.searchFilter": searchFilter
  });

  newConfig
    .save()
    .then(() => res.json("LDAP Config added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// app.post("/admin", function(req, res, next) {
//   passport.authenticate("ldapauth", { session: false }, function(
//     err,
//     user,
//     info
//   ) {
//     if (err) {
//       return res.status(500).next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (!user) {
//       return res.status(401).send({
//         success: false,
//         message: "authentication failed: " + info.message
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: "authentication succeeded: " + user.mail
//     });
//   })(req, res, next);
// });

module.exports = router;
