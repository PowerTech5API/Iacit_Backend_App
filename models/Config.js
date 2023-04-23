const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConfigSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  termsAccepted: {
    type: Boolean,
    required: true
  },
  termsVersion: {
    type: String,
    required: true
  },
  acceptedAt: {
    type: Date,
    required: true
  },
  receiveEmails: {
    type: Boolean,
    default: false
  }

});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = {
  Config,
  ConfigSchema,
}