# AI Rangoli Designer - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Creating Designs](#creating-designs)
3. [Analyzing Patterns](#analyzing-patterns)
4. [Gallery & Management](#gallery--management)
5. [Tips & Tricks](#tips--tricks)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Time Setup

1. **Open Application**
   - Navigate to `http://localhost:8000` (or your server URL)
   - You'll see the main designer interface

2. **Familiarize with Layout**
   - **Left Side**: Large canvas for drawing
   - **Right Side**: Tools and controls
   - **Top**: Navigation tabs for different features

3. **Canvas Overview**
   - White drawing area with grid
   - Real-time statistics panel
   - Control buttons for canvas management

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend server running (for full features)
- 2GB RAM minimum
- Internet connection (for server communication)

---

## Creating Designs

### Step 1: Choose Your Tool

#### Tool Selection
Located on the right panel:

**1. Add Dot** (Default)
- Click anywhere on canvas to place a dot
- Each dot is a control point
- Select color before placing dots
- Adjust dot size with slider

**2. Draw Line**
- Click and drag between points
- Creates straight connection line
- Useful for angular designs
- Release to complete line

**3. Draw Circle**
- Click and drag from center
- Resize by moving mouse
- Perfect for mandala designs
- Release to finalize circle

**4. Mirror (Symmetry)**
- Automatically creates mirrored copies
- Creates 4-fold symmetry by default
- Place dot near center = center mirroring
- Place dot away from center = corner reflections

### Step 2: Customize Appearance

#### Color Selection
```
Color Picker (top left area)
├─ Click to open color palette
├─ Choose from spectrum
└─ Selected color applies to next elements
```

**Recommended Colors:**
- Primary: #FF6B9D (Pink), #C44569 (Dark Red)
- Secondary: #F8B500 (Gold), #00AA77 (Green)
- Neutral: #FFFFFF (White), #333333 (Dark)

#### Brush Size
```
Range: 2-20 pixels
Default: 5 pixels
├─ Smaller (2-5): Detailed, delicate designs
├─ Medium (5-10): Standard, balanced look
└─ Larger (10-20): Bold, prominent elements
```

### Step 3: Create Your Pattern

#### Example: Simple Mandala

**Basic Steps:**
```
1. Select "Add Dot" tool
2. Click in center of canvas (300, 300)
3. Use symmetry mode to place surrounding dots
4. Click "Auto Connect Dots"
5. View your instant mandala!
```

#### Example: Geometric Pattern

**Steps:**
```
1. Place dots in 5×5 grid using symmetry
2. Switch to "Draw Line" tool
3. Draw horizontal and vertical lines
4. Add diagonal lines for complexity
5. Fill colors and refine
```

#### Example: Freeform Design

**Steps:**
```
1. Place dots randomly (no symmetry needed)
2. Click "Connect Dots" for automatic linking
3. Add circles and curves for details
4. Adjust colors for visual interest
5. Save your unique creation
```

### Step 4: Refine Your Design

#### Canvas Controls

**Clear**
- Erases entire canvas
- Use when starting fresh
- Cannot be undone (undo button works otherwise)

**Undo**
- Reverses last action
- Keyboard: `Ctrl+Z`
- Can undo multiple times

**Redo**
- Reverses undo action
- Keyboard: `Ctrl+Y`
- Complements undo feature

**Color Picker**
- Change dot/line color
- Applies to all new elements
- Click to open palette

**Brush Size Slider**
- Adjust dot radius
- Visual feedback on canvas
- Affects new dots only

### Step 5: Connect & Finalize

#### Auto Connect Dots
```
Button: "Auto Connect Dots" (right panel)

What it does:
1. Analyzes dot positions
2. Finds nearest neighbors
3. Draws optimal connecting lines
4. Creates seamless pattern

Result: Professional-looking rangoli instantly
```

#### Modify After Connection
- Add more dots after connecting (still auto-connected)
- Draw additional lines manually
- Adjust colors by redrawing
- Add circles for decorative elements

---

## Analyzing Patterns

### Using the Analyzer Tab

#### 1. Upload Image

**From File:**
```
Step 1: Click "Analyzer" tab
Step 2: Click file input area
Step 3: Select PNG/JPG image
Step 4: System displays preview
Step 5: Analysis begins automatically
```

**Upload Tips:**
- Use clear, well-lit images
- Square format works best (600×600)
- High contrast between dots and background
- Minimum resolution: 300×300 pixels

#### 2. View Analysis Results

**Quick Analysis Section:**
- Detected Dots count
- Detected Connections count
- Complexity percentage
- Pattern type identification

**Detailed Information Section:**
- Symmetry type and score
- When analysis was performed
- Reconstruction option

### Understanding Analysis Results

#### Complexity Score (0-100%)
```
0-30%:    Simple design
          - Few dots (< 10)
          - Basic connections
          - Great for learning

30-60%:   Moderate design
          - Medium dots (10-30)
          - Decent connections
          - Intermediate level

60-100%:  Complex design
          - Many dots (> 30)
          - Intricate patterns
          - Advanced level
```

#### Symmetry Analysis

**Type Detection:**
- **None**: No symmetry detected
- **Rotational**: Spinning symmetry (4-fold, 6-fold, etc.)
- **Reflection**: Mirror symmetry
- **Both**: Combined symmetry types

**Score Interpretation:**
```
0.0-0.3:  Asymmetrical design (intentional or accidental)
0.3-0.6:  Partially symmetrical
0.6-0.8:  Well-balanced with symmetry
0.8-1.0:  Perfect symmetry (mathematical precision)
```

#### Design Principles Breakdown

**Repetition (0-100%)**
- How often elements repeat
- Higher = more rhythmic pattern
- Good for: Creating visual flow

**Balance (0-100%)**
- Visual equilibrium of design
- Higher = more balanced
- Good for: Professional appearance

**Harmony (0-100%)**
- Uniformity of spacing
- Higher = more uniform
- Good for: Pleasing aesthetics

**Emphasis (0-100%)**
- How well focal points stand out
- Higher = clearer emphasis
- Good for: Guided viewing

**Proportion (0-100%)**
- Element size relationships
- Higher = better proportioned
- Good for: Elegant designs

### Reconstructing from Analysis

**Feature: Reconstruct Design**
```
Process:
1. Click "Reconstruct Design" button
2. System detects dots from image
3. Switches to Designer tab
4. Loads dots automatically
5. You can now edit the design

Uses:
- Continue editing from photo
- Learn from existing designs
- Recreate traditional patterns
```

---

## Gallery & Management

### Saving Designs

#### Save to Local Storage
```
Button: "Save Design" (in tools)
Process:
1. Click "Save Design"
2. Enter design name (default: date)
3. Confirm save
4. Design stored locally on your computer
```

#### Save to Server
```
Automatic with local save:
1. Local copy created immediately
2. Server copy sent in background
3. Both updated simultaneously
4. Sync across devices (future feature)
```

### Loading Saved Designs

#### Access Gallery
```
Step 1: Click "Gallery" tab
Step 2: Click "Load Saved Designs"
Step 3: View all your saved designs
Step 4: Click a design to load
Step 5: Continue editing in Designer
```

#### Gallery Display
```
Each Design Card Shows:
├─ Thumbnail preview
├─ Design name
├─ Creation date
└─ Click to load for editing
```

### Managing Designs

#### Export as Image
```
Button: "Export as Image"
Result:
├─ Downloads as PNG file
├─ High quality (transparent background)
├─ Ready to print or share
└─ Filename: rangoli-[timestamp].png
```

#### Delete Designs
```
In Gallery Tab:
1. Right-click on design (future feature)
2. Or use delete button if shown
3. Confirm deletion
4. Removed from both local and server
```

---

## Learning: Design Principles Tab

### Educational Content

**Six Core Principles Explained:**

1. **Symmetry**
   - Rotational and mirror types
   - Mathematical precision
   - Cultural significance

2. **Dot Connection (Pulli)**
   - Foundation technique
   - Traditional methodology
   - Grid arrangements

3. **Repetition**
   - Creating visual rhythm
   - Pattern development
   - Cultural symbolism

4. **Color Harmony**
   - Traditional palettes
   - Psychological effects
   - Festival-specific colors

5. **Proportion & Scale**
   - Golden ratio applications
   - Size hierarchy
   - Visual balance

6. **Cultural Significance**
   - Different occasions
   - Regional variations
   - Spiritual meanings

### Applying Principles to Your Work

**Practical Application:**
```
Learn about Symmetry → Understand 4-fold rotation
    ↓
Use Symmetry Tool → Create symmetric dots
    ↓
Analyze Design → View symmetry score
    ↓
Refine → Adjust for better symmetry
    ↓
Save → Your improved design
```

---

## Tips & Tricks

### Pro Techniques

#### Technique 1: Perfect Mandala
```
1. Place single dot at exact center (300, 300)
2. Switch to Symmetry mode
3. Place dots around center
4. Use Auto Connect for instant mandala
5. Adjust colors for vibrancy
```

#### Technique 2: Layered Design
```
1. Create inner layer of dots
2. Auto connect (save as separate)
3. Create middle layer
4. Create outer layer
5. Combine all for depth
```

#### Technique 3: Color Gradation
```
1. Start with bright color at center
2. Gradually shift to darker at edges
3. Use 3-5 colors total
4. Create visual depth
5. Professional appearance
```

#### Technique 4: Mixed Symmetry
```
1. Create 4-fold symmetric center
2. Add 8-fold pattern around it
3. Combine rotations
4. Complex but beautiful result
5. Show analytical thinking
```

### Keyboard Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` | `Cmd+Y` |
| Save | `Ctrl+S` | `Cmd+S` |
| Clear | Clear Button | Clear Button |

### Time-Saving Tips

**Tip 1: Use Symmetry Mode**
- Places 4 dots for every 1 click
- 4x faster pattern creation
- Ensures perfect symmetry

**Tip 2: Auto Connect**
- Saves manual line drawing
- Optimal connections
- Professional results instantly

**Tip 3: Duplicate & Modify**
- Load gallery design
- Modify colors only
- Change symmetry type
- Create variations quickly

**Tip 4: Template Usage**
- Start with saved simple pattern
- Scale up for larger design
- Refine and customize
- Build complexity gradually

---

## Troubleshooting

### Common Issues & Solutions

#### Issue 1: Dots Not Appearing
```
Problem: Click on canvas but no dot shows
Solutions:
1. Check if correct tool selected (should be "Add Dot")
2. Verify color picker is set to visible color
3. Refresh page and try again
4. Check browser console for errors
```

#### Issue 2: Canvas Won't Clear
```
Problem: Clear button not working
Solutions:
1. Try clicking "Clear" button again
2. Refresh the page
3. Check if design is really on canvas
4. Try Undo multiple times instead
```

#### Issue 3: Connection Algorithm Fails
```
Problem: Auto Connect creates weird lines
Solutions:
1. Dots too close together: Spread them out
2. Dots in line: Offset them slightly
3. Too many dots: Reduce dot count
4. Try manual line drawing instead
```

#### Issue 4: Analysis Not Working
```
Problem: Analyzer shows no results
Solutions:
1. Ensure backend server is running
2. Check browser developer console (F12)
3. Try uploading different image
4. Simplify the design first
```

#### Issue 5: Design Not Saving
```
Problem: Save button doesn't work
Solutions:
1. Check browser allows localStorage
2. Try different browser
3. Clear browser cache
4. Ensure backend is accessible
```

### Performance Tips

**For Smooth Operation:**
- Keep dot count under 100 for best performance
- Close other browser tabs for more resources
- Use modern browsers (Chrome, Firefox latest versions)
- Clear browser cache if slow
- Restart application if unresponsive

### Browser Compatibility

**Full Support:**
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 12+
- ✅ Edge 80+

**Limited Support:**
- ⚠️ Internet Explorer (not recommended)
- ⚠️ Older mobile browsers

### Getting Help

**If Problem Persists:**
1. Check the [README.md](README.md) in docs folder
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Check browser console for error messages
4. Verify all services are running
5. Contact support with error details

---

## FAQ

**Q: Can I share my designs?**
A: Yes! Export as PNG and share. Future versions will have social sharing.

**Q: Is there a mobile app?**
A: Web version works on tablets. Native app in development.

**Q: Can I use this commercially?**
A: Yes, designs are your own. App is MIT licensed.

**Q: How do I get better at designing?**
A: Study the Principles tab, practice symmetry, analyze famous patterns.

**Q: Can I import existing kolam designs?**
A: Upload image → Auto detect → Load in designer → Edit freely.

---

**Happy Designing! 🎨✨**

*For more details, see documentation in /docs folder*

*Version: 1.0 | Last Updated: January 2024*
