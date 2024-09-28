const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['student', 'educator'],
    required: true,
  },
  enrollments: [{
    type: Schema.Types.ObjectId, // References course IDs for students
    ref: 'Course',
  }],
  courses: [{
    type: Schema.Types.ObjectId, // References course IDs for educators
    ref: 'Course',
  }]
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);