const express = require('express');
const router = express.Router();
const About = require('../models/About');
const authMiddleware = require('../middleware/auth');

// GET about info (public)
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT create/update about info (protected - admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
    } else {
      about = new About(req.body);
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(400).json({ message: 'Error updating about info', error: err.message });
  }
});

module.exports = router;