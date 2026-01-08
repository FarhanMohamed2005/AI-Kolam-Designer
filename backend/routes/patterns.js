const express = require('express');
const router = express.Router();
const PatternRecognition = require('../utils/PatternRecognition');

// Analyze pattern from image or canvas data
router.post('/analyze', async (req, res) => {
  try {
    const { imageData, mode } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data required' });
    }

    const analyzer = new PatternRecognition();
    const analysis = await analyzer.analyzeImage(imageData);

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detect dots from image
router.post('/detect-dots', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    const analyzer = new PatternRecognition();
    const dots = await analyzer.detectDots(imageData);

    res.json({
      success: true,
      dots: dots,
      count: dots.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect dots with optimal lines
router.post('/connect-dots', async (req, res) => {
  try {
    const { dots, width, height } = req.body;

    if (!dots || dots.length === 0) {
      return res.status(400).json({ error: 'Dots required' });
    }

    const analyzer = new PatternRecognition();
    const connections = analyzer.connectDots(dots, width, height);

    res.json({
      success: true,
      connections: connections
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate kolam from dots
router.post('/generate', async (req, res) => {
  try {
    const { dots, style, width, height, colors } = req.body;

    const analyzer = new PatternRecognition();
    const kolamImage = analyzer.generateRangoli(dots, style, { width, height, colors });

    res.json({
      success: true,
      image: kolamImage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
