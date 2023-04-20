const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  idUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isSendEmail: { type: Boolean },
  history: {
    day: Date,
    versionTerm: String
  }

});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = {
  Config,
  ConfigSchema,
}