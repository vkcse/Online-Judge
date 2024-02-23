// File: models/Submission.js

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;

