// models/Course.js
const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: String,
  url: String, // URL or path to the uploaded material
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true }, // Path to the thumbnail image
  materials: [MaterialSchema], // Array of learning materials
  tags: { type: [String], required: true },
  educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Course', CourseSchema);