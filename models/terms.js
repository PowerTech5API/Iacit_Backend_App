const mongoose = require('mongoose');
const { Schema } = mongoose;

const TermSchema = new Schema({
  version: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  topics: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    subtopics: [{
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      subtopics: [{
        title: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        }
      }]
    }]
  }]
});

const Terms = mongoose.model('Terms', TermSchema);

module.exports = {
    Terms,
    TermSchema
  };