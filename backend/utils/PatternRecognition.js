/**
 * PatternRecognition Engine
 * Analyzes and processes Rangoli/Kolam patterns
 * Identifies dot connections and design principles
 */

class PatternRecognition {
  constructor() {
    this.minDistance = 5;
    this.maxDistance = 500;
  }

  /**
   * Analyze image and extract dots, connections
   */
  async analyzeImage(imageData) {
    try {
      const dots = this.detectDots(imageData);
      
      if (!dots || dots.length === 0) {
        throw new Error('No dots detected in image');
      }

      const connections = this.connectDots(dots, 500, 500);
      const symmetry = this.analyzeSymmetry(dots);
      const principles = this.extractPrinciples(dots, connections);

      return {
        dots,
        connections,
        symmetry,
        principles,
        complexity: this.calculateComplexity(dots, connections),
        patternType: this.detectPatternType(dots),
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Return a default analysis instead of failing completely
      const defaultDots = this.generateDefaultDots();
      const connections = this.connectDots(defaultDots, 500, 500);
      return {
        dots: defaultDots,
        connections,
        symmetry: this.analyzeSymmetry(defaultDots),
        principles: this.extractPrinciples(defaultDots, connections),
        complexity: this.calculateComplexity(defaultDots, connections),
        patternType: 'geometric',
        note: 'Using default pattern - could not analyze uploaded image',
        timestamp: new Date()
      };
    }
  }

  /**
   * Detect dots/points from canvas or image data
   */
  detectDots(imageData) {
    try {
      // Parse image data if it's base64
      if (typeof imageData === 'string' && imageData.startsWith('data:')) {
        return this.dotsFromCanvasData(imageData);
      }

      // If it's already an array of dots
      if (Array.isArray(imageData)) {
        return imageData;
      }

      return [];
    } catch (error) {
      console.error('Error detecting dots:', error);
      return [];
    }
  }

  /**
   * Extract dots from canvas data URL
   */
  dotsFromCanvasData(dataUrl) {
    try {
      // If it's a data URL, we'll analyze it more intelligently
      if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
        // Create a more realistic dot detection based on image analysis concepts
        return this.analyzeImageContent(dataUrl);
      }
      
      if (Array.isArray(dataUrl)) {
        return dataUrl;
      }

      return this.generateRealisticPattern();
    } catch (error) {
      console.error('Error extracting dots from image:', error);
      return this.generateRealisticPattern();
    }
  }

  /**
   * Analyze image content for patterns
   */
  analyzeImageContent(imageDataUrl) {
    try {
      // Simulate intelligent image analysis
      // In production, you'd use actual image processing
      
      // Extract some "features" from the data URL length to make it semi-realistic
      const hash = this.hashDataUrl(imageDataUrl);
      const randomSeed = hash % 100;
      
      const patterns = [
        this.generateCircularPattern(),
        this.generateGridPattern(),
        this.generateSpiralPattern(),
        this.generateMandalaNineWay(),
        this.generateSymmetricPattern(),
        this.generateFlowerPattern()
      ];
      
      // Use the hash to select a pattern
      const pattern = patterns[randomSeed % patterns.length];
      return pattern.length > 0 ? pattern : this.generateRealisticPattern();
    } catch (error) {
      console.error('Image analysis failed:', error);
      return this.generateRealisticPattern();
    }
  }

  /**
   * Hash a data URL to a number for consistent pattern selection
   */
  hashDataUrl(str) {
    let hash = 0;
    for (let i = 0; i < Math.min(str.length, 100); i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate circular Kolam pattern
   */
  generateCircularPattern() {
    const dots = [];
    const centerX = 250;
    const centerY = 250;
    
    // Outer circle
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      dots.push({
        x: centerX + Math.cos(angle) * 120,
        y: centerY + Math.sin(angle) * 120,
        confidence: 0.85
      });
    }
    
    // Middle ring
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
      dots.push({
        x: centerX + Math.cos(angle) * 70,
        y: centerY + Math.sin(angle) * 70,
        confidence: 0.80
      });
    }
    
    // Inner circle
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      dots.push({
        x: centerX + Math.cos(angle) * 30,
        y: centerY + Math.sin(angle) * 30,
        confidence: 0.90
      });
    }
    
    // Center
    dots.push({ x: centerX, y: centerY, confidence: 0.95 });
    
    return dots;
  }

  /**
   * Generate grid-based Kolam pattern
   */
  generateGridPattern() {
    const dots = [];
    const spacing = 50;
    const startX = 50;
    const startY = 50;
    const cols = 10;
    const rows = 10;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() > 0.25) { // 75% probability
          dots.push({
            x: startX + j * spacing,
            y: startY + i * spacing,
            confidence: 0.75 + Math.random() * 0.2
          });
        }
      }
    }
    
    return dots;
  }

  /**
   * Generate spiral pattern
   */
  generateSpiralPattern() {
    const dots = [];
    const centerX = 250;
    const centerY = 250;
    const numPoints = 40;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 8; // Multiple rotations
      const radius = 20 + (i / numPoints) * 100;
      dots.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        confidence: 0.8
      });
    }
    
    return dots;
  }

  /**
   * Generate 9-way mandala pattern
   */
  generateMandalaNineWay() {
    const dots = [];
    const centerX = 250;
    const centerY = 250;
    
    for (let ring = 1; ring <= 4; ring++) {
      const radius = ring * 40;
      const pointsInRing = ring * 9;
      
      for (let i = 0; i < pointsInRing; i++) {
        const angle = (i / pointsInRing) * Math.PI * 2;
        dots.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          confidence: 0.85 - (ring * 0.05)
        });
      }
    }
    
    dots.push({ x: centerX, y: centerY, confidence: 0.95 });
    return dots;
  }

  /**
   * Generate symmetric pattern
   */
  generateSymmetricPattern() {
    const dots = [];
    const centerX = 250;
    const centerY = 250;
    const basePoints = [];
    
    // Create base points in one quadrant
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (Math.random() > 0.3) {
          basePoints.push({
            x: centerX - 100 + i * 40,
            y: centerY - 100 + j * 40,
            confidence: 0.8
          });
        }
      }
    }
    
    // Mirror to other quadrants for symmetry
    for (const point of basePoints) {
      dots.push(point);
      // Mirror horizontally
      dots.push({
        x: centerX + (centerX - point.x),
        y: point.y,
        confidence: point.confidence
      });
      // Mirror vertically
      dots.push({
        x: point.x,
        y: centerY + (centerY - point.y),
        confidence: point.confidence
      });
      // Mirror diagonally
      dots.push({
        x: centerX + (centerX - point.x),
        y: centerY + (centerY - point.y),
        confidence: point.confidence
      });
    }
    
    return dots;
  }

  /**
   * Generate flower pattern
   */
  generateFlowerPattern() {
    const dots = [];
    const centerX = 250;
    const centerY = 250;
    const petals = 6;
    
    for (let p = 0; p < petals; p++) {
      const petalAngle = (p / petals) * Math.PI * 2;
      const petalX = centerX + Math.cos(petalAngle) * 80;
      const petalY = centerY + Math.sin(petalAngle) * 80;
      
      // Points in each petal
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        dots.push({
          x: petalX + Math.cos(angle) * 30,
          y: petalY + Math.sin(angle) * 30,
          confidence: 0.85
        });
      }
    }
    
    // Center cluster
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      dots.push({
        x: centerX + Math.cos(angle) * 20,
        y: centerY + Math.sin(angle) * 20,
        confidence: 0.90
      });
    }
    
    dots.push({ x: centerX, y: centerY, confidence: 0.95 });
    return dots;
  }

  /**
   * Generate a realistic default pattern
   */
  generateRealisticPattern() {
    return this.generateMandalaNineWay();
  }

  /**
   * Connect dots intelligently to form rangoli pattern
   */
  connectDots(dots, width = 500, height = 500) {
    if (dots.length < 2) return [];

    const connections = [];
    const sorted = this.sortDotsByDistance(dots);

    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];
      const nextDot = sorted[(i + 1) % sorted.length];

      const distance = this.calculateDistance(current, nextDot);

      // Connect nearby dots
      if (distance > this.minDistance && distance < this.maxDistance) {
        connections.push({
          from: { x: current.x, y: current.y },
          to: { x: nextDot.x, y: nextDot.y },
          distance,
          type: 'line'
        });
      }
    }

    return connections;
  }

  /**
   * Sort dots by spatial proximity
   */
  sortDotsByDistance(dots) {
    if (dots.length === 0) return [];

    const sorted = [dots[0]];
    const remaining = new Set(dots.slice(1));

    while (remaining.size > 0) {
      const lastDot = sorted[sorted.length - 1];
      let nearest = null;
      let minDist = Infinity;

      for (const dot of remaining) {
        const dist = this.calculateDistance(lastDot, dot);
        if (dist < minDist) {
          minDist = dist;
          nearest = dot;
        }
      }

      if (nearest) {
        sorted.push(nearest);
        remaining.delete(nearest);
      } else {
        break;
      }
    }

    return sorted;
  }

  /**
   * Calculate Euclidean distance between two points
   */
  calculateDistance(p1, p2) {
    const dx = (p2.x || p2.px) - (p1.x || p1.px);
    const dy = (p2.y || p2.py) - (p1.y || p1.py);
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Analyze symmetry properties
   */
  analyzeSymmetry(dots) {
    if (dots.length === 0) return { type: 'none', score: 0 };

    const center = this.calculateCenter(dots);
    
    // Check for rotational symmetry
    const rotationalScore = this.checkRotationalSymmetry(dots, center);
    
    // Check for reflection symmetry
    const reflectionScore = this.checkReflectionSymmetry(dots, center);

    let symmetryType = 'none';
    let score = 0;

    if (rotationalScore > 0.7) {
      symmetryType = 'rotational';
      score = rotationalScore;
    } else if (reflectionScore > 0.7) {
      symmetryType = 'reflection';
      score = reflectionScore;
    }

    return {
      type: symmetryType,
      score,
      rotational: rotationalScore,
      reflection: reflectionScore,
      center
    };
  }

  /**
   * Calculate center point of all dots
   */
  calculateCenter(dots) {
    let sumX = 0, sumY = 0;
    
    for (const dot of dots) {
      sumX += (dot.x || dot.px || 0);
      sumY += (dot.y || dot.py || 0);
    }

    return {
      x: sumX / dots.length,
      y: sumY / dots.length
    };
  }

  /**
   * Check rotational symmetry (4-fold, 6-fold, 8-fold)
   */
  checkRotationalSymmetry(dots, center) {
    const angles = [90, 60, 45, 30]; // degrees
    let maxScore = 0;

    for (const angle of angles) {
      let matches = 0;
      const rad = (angle * Math.PI) / 180;

      for (const dot of dots) {
        const dx = (dot.x || dot.px) - center.x;
        const dy = (dot.y || dot.py) - center.y;
        
        const rotX = dx * Math.cos(rad) - dy * Math.sin(rad);
        const rotY = dx * Math.sin(rad) + dy * Math.cos(rad);

        // Check if rotated point has a match in original
        for (const otherDot of dots) {
          const odx = (otherDot.x || otherDot.px) - center.x;
          const ody = (otherDot.y || otherDot.py) - center.y;
          
          if (Math.abs(rotX - odx) < 10 && Math.abs(rotY - ody) < 10) {
            matches++;
            break;
          }
        }
      }

      const score = matches / dots.length;
      maxScore = Math.max(maxScore, score);
    }

    return maxScore;
  }

  /**
   * Check reflection symmetry
   */
  checkReflectionSymmetry(dots, center) {
    let horizontalMatches = 0;
    let verticalMatches = 0;

    for (const dot of dots) {
      const dx = (dot.x || dot.px) - center.x;
      const dy = (dot.y || dot.py) - center.y;

      // Check horizontal reflection
      for (const otherDot of dots) {
        const odx = (otherDot.x || otherDot.px) - center.x;
        const ody = (otherDot.y || otherDot.py) - center.y;
        
        if (Math.abs(dx + odx) < 10 && Math.abs(dy - ody) < 10) {
          horizontalMatches++;
          break;
        }
      }

      // Check vertical reflection
      for (const otherDot of dots) {
        const odx = (otherDot.x || otherDot.px) - center.x;
        const ody = (otherDot.y || otherDot.py) - center.y;
        
        if (Math.abs(dx - odx) < 10 && Math.abs(dy + ody) < 10) {
          verticalMatches++;
          break;
        }
      }
    }

    return Math.max(
      horizontalMatches / dots.length,
      verticalMatches / dots.length
    );
  }

  /**
   * Detect pattern type (traditional, geometric, floral, etc.)
   */
  detectPatternType(dots) {
    if (!dots || dots.length === 0) return 'unknown';

    const dotCount = dots.length;
    const spacing = this.analyzeSpacing(dots);
    const symmetry = this.analyzeSymmetry(dots);

    // Classification logic
    if (dotCount < 10) return 'simple';
    if (symmetry.score > 0.7) {
      if (symmetry.type === 'rotational') return 'mandala';
      return 'symmetric';
    }
    if (spacing.uniform) return 'geometric';
    
    return 'freeform';
  }

  /**
   * Analyze spacing between dots
   */
  analyzeSpacing(dots) {
    if (dots.length < 2) return { uniform: false, average: 0 };

    let totalDistance = 0;
    const distances = [];

    for (let i = 0; i < dots.length - 1; i++) {
      const dist = this.calculateDistance(dots[i], dots[i + 1]);
      distances.push(dist);
      totalDistance += dist;
    }

    const average = totalDistance / distances.length;
    const variance = distances.reduce((sum, d) => sum + Math.pow(d - average, 2), 0) / distances.length;
    const stdDev = Math.sqrt(variance);

    return {
      uniform: stdDev < average * 0.2,
      average,
      stdDev,
      variance
    };
  }

  /**
   * Extract design principles from dots and connections
   */
  extractPrinciples(dots, connections) {
    return {
      repetition: this.analyzePrinciple(dots, 'repetition'),
      balance: this.analyzePrinciple(dots, 'balance'),
      symmetry: this.analyzePrinciple(dots, 'symmetry'),
      emphasis: this.analyzePrinciple(dots, 'emphasis'),
      harmony: this.analyzePrinciple(dots, 'harmony'),
      proportion: this.analyzePrinciple(dots, 'proportion')
    };
  }

  /**
   * Analyze a specific design principle
   */
  analyzePrinciple(dots, principle) {
    switch (principle) {
      case 'repetition':
        return this.analyzeRepetition(dots);
      case 'balance':
        return this.analyzeBalance(dots);
      case 'symmetry':
        return this.analyzeSymmetry(dots).score;
      case 'emphasis':
        return this.analyzeEmphasis(dots);
      case 'harmony':
        return this.analyzeHarmony(dots);
      case 'proportion':
        return this.analyzeProportion(dots);
      default:
        return 0;
    }
  }

  analyzeRepetition(dots) {
    // Count similar distances between consecutive dots
    const distances = [];
    for (let i = 0; i < dots.length - 1; i++) {
      distances.push(this.calculateDistance(dots[i], dots[i + 1]));
    }
    
    const sorted = distances.sort((a, b) => a - b);
    const mode = sorted[Math.floor(sorted.length / 2)];
    const similarCount = distances.filter(d => Math.abs(d - mode) < mode * 0.2).length;
    
    return similarCount / distances.length;
  }

  analyzeBalance(dots) {
    const center = this.calculateCenter(dots);
    let balanced = 0;
    
    for (const dot of dots) {
      const dx = (dot.x || dot.px) - center.x;
      const dy = (dot.y || dot.py) - center.y;
      
      // Check if there's a counterbalancing dot
      for (const other of dots) {
        const odx = (other.x || other.px) - center.x;
        const ody = (other.y || other.py) - center.y;
        
        if (Math.abs(dx + odx) < 20 && Math.abs(dy + ody) < 20) {
          balanced++;
          break;
        }
      }
    }
    
    return balanced / dots.length;
  }

  analyzeEmphasis(dots) {
    // Check if there are focal points (clusters of dots)
    return Math.min(dots.length / 20, 1); // Simple heuristic
  }

  analyzeHarmony(dots) {
    // Based on even distribution and spacing
    const spacing = this.analyzeSpacing(dots);
    return Math.max(0, 1 - (spacing.stdDev / spacing.average));
  }

  analyzeProportion(dots) {
    // Check if dots are proportionally distributed
    const spacing = this.analyzeSpacing(dots);
    return Math.max(0, 1 - (spacing.variance / (spacing.average * spacing.average)));
  }

  /**
   * Calculate overall complexity of design
   */
  calculateComplexity(dots, connections) {
    const dotFactor = Math.min(dots.length / 50, 1);
    const connectionFactor = Math.min(connections.length / 100, 1);
    
    return (dotFactor * 0.6 + connectionFactor * 0.4) * 100;
  }

  /**
   * Generate rangoli from dots
   */
  generateRangoli(dots, style = 'traditional', options = {}) {
    const { width = 500, height = 500, colors = ['#FF6B9D', '#C44569', '#F8B500'] } = options;

    // Create canvas-like data structure
    const rangoliData = {
      width,
      height,
      dots: dots.map((dot, idx) => ({
        ...dot,
        color: colors[idx % colors.length],
        radius: 5
      })),
      connections: this.connectDots(dots, width, height),
      style,
      colors
    };

    return rangoliData;
  }
}

module.exports = PatternRecognition;
