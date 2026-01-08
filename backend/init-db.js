/**
 * Database Initialization Script
 * Creates sample Kolam designs for testing
 */

// Load the model
const KolamDesign = require('./models/RangoliDesign');

// Sample designs to add to the database
const sampleDesigns = [
  {
    name: 'Classic Circular Kolam',
    dots: [
      { x: 300, y: 100 }, { x: 350, y: 120 }, { x: 400, y: 100 },
      { x: 420, y: 150 }, { x: 400, y: 200 }, { x: 350, y: 220 },
      { x: 300, y: 200 }, { x: 280, y: 150 }
    ],
    lines: [
      { start: { x: 300, y: 100 }, end: { x: 350, y: 120 } },
      { start: { x: 350, y: 120 }, end: { x: 400, y: 100 } },
      { start: { x: 400, y: 100 }, end: { x: 420, y: 150 } },
      { start: { x: 420, y: 150 }, end: { x: 400, y: 200 } },
      { start: { x: 400, y: 200 }, end: { x: 350, y: 220 } },
      { start: { x: 350, y: 220 }, end: { x: 300, y: 200 } },
      { start: { x: 300, y: 200 }, end: { x: 280, y: 150 } },
      { start: { x: 280, y: 150 }, end: { x: 300, y: 100 } }
    ],
    style: 'traditional'
  },
  {
    name: 'Geometric Star Pattern',
    dots: [
      { x: 300, y: 150 }, { x: 400, y: 150 },
      { x: 450, y: 200 }, { x: 400, y: 300 },
      { x: 300, y: 300 }, { x: 250, y: 200 }
    ],
    lines: [
      { start: { x: 300, y: 150 }, end: { x: 400, y: 150 } },
      { start: { x: 400, y: 150 }, end: { x: 450, y: 200 } },
      { start: { x: 450, y: 200 }, end: { x: 400, y: 300 } },
      { start: { x: 400, y: 300 }, end: { x: 300, y: 300 } },
      { start: { x: 300, y: 300 }, end: { x: 250, y: 200 } },
      { start: { x: 250, y: 200 }, end: { x: 300, y: 150 } }
    ],
    style: 'geometric'
  },
  {
    name: 'Floral Mandala',
    dots: [
      { x: 350, y: 150 }, { x: 400, y: 180 }, { x: 420, y: 230 },
      { x: 380, y: 270 }, { x: 320, y: 270 }, { x: 280, y: 230 },
      { x: 300, y: 180 }, { x: 350, y: 200 }
    ],
    lines: [],
    style: 'floral'
  }
];

console.log('Initializing database with sample Kolam designs...\n');

try {
  // Clear existing data first
  KolamDesign.designs = [];
  KolamDesign.idCounter = 0;
  
  // Add sample designs synchronously
  for (const design of sampleDesigns) {
    const id = ++KolamDesign.idCounter;
    const designObj = {
      _id: id.toString(),
      id: id,
      name: design.name || `Kolam-${new Date().toLocaleDateString()}`,
      dots: design.dots || [],
      lines: design.lines || [],
      circles: [],
      connections: [],
      imageData: '',
      style: design.style || 'traditional',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    KolamDesign.designs.push(designObj);
    console.log(`✓ Initialized: ${design.name} (ID: ${id})`);
  }
  
  // Save to global storage
  global.designStorage = KolamDesign.designs;
  
  console.log('\n✓ Database initialization complete!');
  console.log(`Total designs initialized: ${KolamDesign.designs.length}`);
  console.log('\nYou can now:');
  console.log('1. Visit http://localhost:5000');
  console.log('2. Click the Gallery tab');
  console.log('3. Click "Load Saved Designs"');
  console.log('4. See your sample Kolams!');
  
  process.exit(0);
} catch (error) {
  console.error('✗ Error initializing database:', error.message);
  console.error(error);
  process.exit(1);
}
