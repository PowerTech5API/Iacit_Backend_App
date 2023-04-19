const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({
    ro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ro'
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  });
  
  const Chat = mongoose.model('Chat', ChatSchema);

  module.exports = {
    Chat,
    ChatSchema,
}