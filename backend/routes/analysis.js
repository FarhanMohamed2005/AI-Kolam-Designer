const express = require('express');
const router = express.Router();
const PatternRecognition = require('../utils/PatternRecognition');

// Analyze symmetry in kolam
router.post('/symmetry', async (req, res) => {
  try {
    const { dots, imageData } = req.body;

    const analyzer = new PatternRecognition();
    const symmetryAnalysis = analyzer.analyzeSymmetry(dots || imageData);

    res.json({
      success: true,
      symmetry: symmetryAnalysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detect pattern type
router.post('/pattern-type', async (req, res) => {
  try {
    const { dots, imageData } = req.body;

    const analyzer = new PatternRecognition();
    const patternType = analyzer.detectPatternType(dots || imageData);

    res.json({
      success: true,
      patternType: patternType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Extract design principles
router.post('/principles', async (req, res) => {
  try {
    const { dots, connections } = req.body;

    if (!dots || dots.length === 0) {
      return res.status(400).json({ error: 'Dots required' });
    }

    const analyzer = new PatternRecognition();
    const principles = analyzer.extractPrinciples(dots, connections);

    res.json({
      success: true,
      principles: principles
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
