const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const configSchema = new Schema(
  {
    ldap: {
      url: {
        type: String,
        lowercase: true,
        trim: true
      },
      bindDN: {
        type: String,
        lowercase: true,
        trim: true
      },
      bindPass: {
        type: String,
        lowercase: true,
        trim: true
      },
      searchBase: {
        type: String,
        lowercase: true,
        trim: true
      },
      searchFilter: {
        type: String,
        lowercase: true,
        trim: true
      }
    }
  },
  {
    timestamps: true
  }
);

const Configs = mongoose.model("Configs", configSchema, "Configs");

module.exports = Configs;
