const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const LdapStrategy = require("passport-ldapauth");
const bodyParser = require("body-parser");
const passport = require("passport");

require("dotenv").config();

const defaultConfig = {
  ldap: {
    url: "",
    bindDN: "",
    bindPass: "",
    searchBase: "",
    searchFilter: ""
  }
};

// LDAP Auth template in .env

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  connection.db.listCollections().toArray(function(err, collectionNames) {
    if (err) {
      console.log(err);
      return;
    } else {
      if (collectionNames.find(({ name }) => name === "Configs")) {
        console.log("Configs already exists");
      } else {
        console.log("init default config collections");
        const initConfig = new Configs({
          ldap: defaultConfig.ldap
        });

        initConfig
          .save()
          .then(console.log("Added init default configs"))
          .catch(err => console.log("Error: " + err));
      }
    }
  });
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
