const express = require('express');
const router = express.Router();
const PatternRecognition = require('../utils/PatternRecognition');
const AIAnalysisService = require('../services/AIAnalysisService');

// Enhanced image analysis with AI
router.post('/image-analysis-ai', async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data required' });
    }

    // Try AI analysis first
    let aiAnalysis = null;
    if (AIAnalysisService.isConfigured()) {
      try {
        aiAnalysis = await AIAnalysisService.analyzeImage(imageData);
        console.log('✅ AI Analysis successful');
      } catch (error) {
        console.warn('⚠️  AI Analysis failed, falling back to local analysis:', error.message);
      }
    }

    // Fall back to local pattern recognition
    const localAnalysis = new PatternRecognition().dotsFromCanvasData(imageData);

    res.json({
      success: true,
      aiAnalysis: aiAnalysis,
      localAnalysis: localAnalysis,
      method: aiAnalysis ? 'ai' : 'local'
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

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
