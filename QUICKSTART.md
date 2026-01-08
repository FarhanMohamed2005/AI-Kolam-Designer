# AI Rangoli Designer - Quick Start Guide

## Installation

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

## Running the Application

### Option 1: Using npm (Recommended)

#### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

Backend will run on: `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npx http-server
```

Frontend will run on: `http://localhost:8080`

#### Open in Browser
```
http://localhost:8080
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
node server.js
```

#### Frontend Setup
```bash
cd frontend
# Using Python 3
python -m http.server 8000

# Or using Node
npx http-server

# Or using any local HTTP server
```

## Verification

### Check Backend is Running
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "API is running"}
```

### Check Frontend is Accessible
Open browser and navigate to serving URL (usually http://localhost:8080)

## First Steps

1. **Create a Simple Design**
   - Click "Add Dot" tool
   - Click 5-6 times on canvas
   - Click "Auto Connect Dots"
   - View your rangoli!

2. **Analyze a Design**
   - Go to "Analyzer" tab
   - Upload a rangoli/kolam image
   - View analysis results

3. **Save Your Work**
   - Click "Save Design"
   - Enter a name
   - Design saved to both local and server

4. **Learn Design Principles**
   - Click "Design Principles" tab
   - Read about Symmetry, Repetition, etc.
   - Apply concepts to your designs

## Troubleshooting

### Backend Not Starting
```
Error: Port 5000 already in use
Solution: Change PORT in .env file
```

### Frontend Can't Connect to Backend
```
Error: API not available
Solution: Ensure backend is running on port 5000
Check browser console (F12) for CORS errors
```

### Canvas Not Responsive
```
Solution: Clear browser cache (Ctrl+Shift+Delete)
Refresh page (Ctrl+R)
Try different browser
```

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **RAM**: 2GB minimum, 4GB recommended
- **Disk**: 500MB for installation

## Useful Commands

```bash
# Frontend
npm start              # Start frontend server
npm test              # Run tests
npm build             # Build for production

# Backend
npm run dev           # Development with nodemon
npm start             # Production
npm test              # Run tests
```

## Environment Variables

Edit `backend/.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rangoli-designer
JWT_SECRET=your_secret_key
```

## Getting Help

- **Documentation**: See `/docs` folder
- **API Reference**: [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)
- **Design Guide**: [DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md)
- **User Guide**: [USER_GUIDE.md](docs/USER_GUIDE.md)

## Features

✅ Interactive Canvas Designer
✅ Pattern Analysis Engine
✅ Design Principles Learning
✅ Save/Load Designs
✅ Export as Image
✅ Symmetry Detection
✅ Responsive UI
✅ Modern Styling

## Next Steps

1. Complete the basic tutorial
2. Explore different tools
3. Study design principles
4. Create and save designs
5. Analyze existing patterns
6. Share your creations

---

**Happy Designing! 🎨✨**
