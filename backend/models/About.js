const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String }],
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
  education: [{
    degree: String,
    institution: String,
    duration: String,
  }],
  experience: [{
    title: String,
    description: String,
    technologies: [String],
  }],
  achievements: [{ type: String }],
  resumeUrl: { type: String },
  profileImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);