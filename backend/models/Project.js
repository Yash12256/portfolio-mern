const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],       // e.g. ["React", "Node.js", "MongoDB"]
  githubLink: { type: String },
  liveLink: { type: String },
  image: { type: String },             // URL or filename of project screenshot
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);