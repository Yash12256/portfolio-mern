const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const About = require('../models/About');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, 'resume' + path.extname(file.originalname)); // always saves as resume.pdf
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// POST /api/upload/resume (protected - admin only)
router.post('/resume', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const resumeUrl = `/uploads/${req.file.filename}`;

    let about = await About.findOne();
    if (about) {
      about.resumeUrl = resumeUrl;
      await about.save();
    }

    res.json({ message: 'Resume uploaded successfully', resumeUrl });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;