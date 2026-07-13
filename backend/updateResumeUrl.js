const mongoose = require('mongoose');
require('dotenv').config();
const About = require('./models/About');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const about = await About.findOne();
  if (about) {
    about.resumeUrl = '/uploads/resume.pdf';
    await about.save();
    console.log('Resume URL updated!');
  } else {
    console.log('No About document found.');
  }
  process.exit();
};

run();