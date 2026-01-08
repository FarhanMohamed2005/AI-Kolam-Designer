const express = require('express');
const router = express.Router();
const KolamDesign = require('../models/RangoliDesign');

// Get all designs
router.get('/', async (req, res) => {
  try {
    const designs = await KolamDesign.find();
    res.json(designs);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ error: error.message, designs: [] });
  }
});

// Get design by ID
router.get('/:id', async (req, res) => {
  try {
    const design = await KolamDesign.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    res.json(design);
  } catch (error) {
    console.error('Error fetching design:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save new design
router.post('/', async (req, res) => {
  try {
    const { name, dots, lines, circles, connections, imageData, style } = req.body;
    
    console.log('Saving design:', name);
    
    const design = await KolamDesign.create({
      name: name || `Kolam-${new Date().toLocaleDateString()}`,
      dots: dots || [],
      lines: lines || [],
      circles: circles || [],
      connections: connections || [],
      imageData: imageData || '',
      style: style || 'traditional'
    });

    console.log('Design saved with ID:', design.id);
    res.status(201).json(design);
  } catch (error) {
    console.error('Error saving design:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update design
router.put('/:id', async (req, res) => {
  try {
    const design = await KolamDesign.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    res.json(design);
  } catch (error) {
    console.error('Error updating design:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete design
router.delete('/:id', async (req, res) => {
  try {
    const result = await KolamDesign.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Design not found' });
    }
    res.json({ message: 'Design deleted', success: true });
  } catch (error) {
    console.error('Error deleting design:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
