# AI Rangoli Designer - Complete Web Application

A comprehensive web application for designing, analyzing, and learning about traditional South Indian Rangoli and Kolam patterns using AI-powered pattern recognition.

## Project Overview

**Rangoli** (also known as **Kolam** in Tamil Nadu) is a traditional art form involving the creation of intricate patterns on floors, particularly during festivals and auspicious occasions in South India.

This application provides:
- **Interactive Canvas Designer**: Draw dots and create beautiful rangoli patterns
- **Pattern Recognition Engine**: Automatically detect and analyze dot arrangements
- **Design Principles**: Understand symmetry, repetition, balance, and harmony
- **Design Gallery**: Save and manage your creations
- **AI-Powered Analysis**: Get detailed insights about your designs

## Technology Stack

### Frontend
- **HTML5**: Canvas API for drawing
- **CSS3**: Responsive design with modern styling
- **Vanilla JavaScript**: Pure JS for interactivity (no framework dependencies)
- **Canvas Drawing Engine**: Custom implementation for rangoli creation

### Backend
- **Node.js + Express**: RESTful API server
- **Pattern Recognition Engine**: Custom algorithm for dot detection and analysis
- **In-Memory Storage**: Default storage (can integrate with MongoDB)
- **CORS Enabled**: Cross-origin requests support

## Project Structure

```
AI Rangoli Designer/
├── frontend/
│   ├── index.html          # Main application interface
│   ├── css/
│   │   └── styles.css      # All styling (responsive, modern)
│   └── js/
│       ├── canvas.js       # Canvas drawing engine
│       ├── analyzer.js     # Pattern analysis logic
│       ├── api.js          # Backend API communication
│       └── ui.js           # UI interactions and tab management
├── backend/
│   ├── server.js           # Express server entry point
│   ├── package.json        # Dependencies and scripts
│   ├── .env.example        # Environment configuration template
│   ├── routes/
│   │   ├── designs.js      # Design CRUD endpoints
│   │   ├── patterns.js     # Pattern processing endpoints
│   │   └── analysis.js     # Analysis endpoints
│   ├── models/
│   │   └── RangoliDesign.js # Data model
│   └── utils/
│       └── PatternRecognition.js # Core AI engine
└── docs/
    ├── README.md           # This file
    ├── API_DOCUMENTATION.md
    ├── DESIGN_PRINCIPLES.md
    └── USER_GUIDE.md
```

## Features

### 1. **Interactive Designer**
- Draw dots on canvas with customizable colors and sizes
- Line and circle drawing tools
- **Symmetry Mode**: Automatically create 4-fold symmetric patterns
- Undo/Redo functionality
- Auto-connect dots for instant pattern formation
- Real-time statistics

### 2. **Pattern Analysis**
- Detect dots from uploaded images
- Analyze symmetry (rotational and reflection)
- Calculate design complexity
- Extract design principles (repetition, balance, harmony, etc.)
- Pattern type detection

### 3. **Design Principles**
Learn about:
- **Symmetry**: 4-fold, 6-fold, 8-fold rotations
- **Repetition**: Creating visual rhythm
- **Dot Connection**: Core technique of kolam creation
- **Color Harmony**: Traditional color choices
- **Proportion & Scale**: Visual balance
- **Cultural Significance**: Traditional meanings

### 4. **Gallery & Storage**
- Save designs locally (localStorage) and to server
- Browse saved designs
- Load and edit previous creations
- Export designs as PNG images

## Getting Started

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev  # Start in development mode
```

#### Frontend Setup
```bash
cd frontend
# Serve via any HTTP server:
# Using Python 3:
python -m http.server 8000
# Or using Node (http-server):
npx http-server
```

### Running the Application

1. **Start Backend Server**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

2. **Start Frontend**:
```bash
cd frontend
npx http-server
# Open http://localhost:8080 in browser
```

3. **Open Application**:
Navigate to `http://localhost:8000` (or your serving port)

## API Endpoints

### Designs
- `GET /api/designs` - Get all designs
- `GET /api/designs/:id` - Get specific design
- `POST /api/designs` - Save new design
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design

### Patterns
- `POST /api/patterns/analyze` - Analyze image/canvas data
- `POST /api/patterns/detect-dots` - Detect dots from image
- `POST /api/patterns/connect-dots` - Connect dots optimally
- `POST /api/patterns/generate` - Generate rangoli from dots

### Analysis
- `POST /api/analysis/symmetry` - Analyze symmetry
- `POST /api/analysis/pattern-type` - Detect pattern type
- `POST /api/analysis/principles` - Extract design principles

## Usage Guide

### Creating a Rangoli

1. **Select Tool**:
   - **Dot**: Click to place dots
   - **Line**: Click and drag to draw lines
   - **Circle**: Click and drag to draw circles
   - **Mirror**: Creates symmetric copies

2. **Customize**:
   - Change dot color with color picker
   - Adjust brush size with slider
   - Select design style

3. **Connect Dots**:
   - Click "Auto Connect Dots" button
   - System automatically links nearby dots

4. **Analyze**:
   - Click "Analyze Design" to get insights
   - View symmetry, complexity, and principles

5. **Save & Export**:
   - Save to gallery (local + server)
   - Export as PNG image

### Analyzing Uploaded Images

1. Go to "Analyzer" tab
2. Upload a rangoli/kolam image
3. View detected dots and connections
4. Click "Reconstruct Design" to edit in canvas

## Core Algorithms

### Dot Detection
Analyzes pixel patterns to identify dot positions and clusters.

### Connection Algorithm
Uses nearest-neighbor approach to optimally connect dots while respecting maximum distance constraints.

### Symmetry Analysis
- **Rotational Symmetry**: Checks 90°, 60°, 45°, 30° rotations
- **Reflection Symmetry**: Analyzes horizontal and vertical mirroring

### Complexity Calculation
Based on:
- Number of dots (up to 50 = 60% of complexity score)
- Number of connections (up to 100 = 40% of complexity score)

### Design Principle Extraction
Evaluates:
- **Repetition**: Similar distances between consecutive dots
- **Balance**: Counterbalancing dot positions
- **Emphasis**: Focal point clustering
- **Harmony**: Uniform spacing distribution
- **Proportion**: Even dot distribution

## Rangoli Design Principles

### Traditional Aspects
- **Symmetry**: Most kolams use perfect symmetry for auspiciousness
- **Dots (Pulli)**: Foundation - usually in square grid patterns
- **Curves & Lines**: Connected between dots in traditional templates
- **Colors**: Red, Yellow, Green, White on dark backgrounds
- **Occasions**: Different designs for Diwali, weddings, daily usage

### Cultural Significance
- Each pattern has specific meanings
- Regional variations across South India
- Passed down through generations
- Often created by women as spiritual practice

## Browser Compatibility

✅ Chrome/Chromium (v80+)
✅ Firefox (v75+)
✅ Safari (v12+)
✅ Edge (v80+)
✅ Opera (v67+)

## Future Enhancements

- [ ] ML-based pattern recognition (TensorFlow.js)
- [ ] MongoDB integration for persistent storage
- [ ] User authentication and profiles
- [ ] Collaborative design features
- [ ] Mobile app (React Native)
- [ ] VR/AR visualization
- [ ] Real-time collaborative editing
- [ ] Pattern library with traditional designs
- [ ] Video tutorials
- [ ] Social sharing features

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - Free for personal and commercial use

## Authors

- **AI Rangoli Designer Team**

## References

- Traditional Kolam patterns from South India
- Canvas API documentation
- Pattern recognition algorithms
- Symmetry mathematics

## Support

For issues, suggestions, or questions:
- Create an issue in the repository
- Contact: [support email]
- Documentation: See /docs folder

---

**Created with ❤️ for traditional art lovers and digital enthusiasts**
