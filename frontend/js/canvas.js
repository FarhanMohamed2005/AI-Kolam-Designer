/**
 * Canvas Drawing Engine
 * Handles all drawing operations for the kolam designer
 */

const canvas = document.getElementById('rangoliCanvas');
const ctx = canvas.getContext('2d');

let dots = [];
let lines = [];
let circles = [];
let history = [];
let historyStep = -1;
let currentTool = 'dot';
let isDrawing = false;
let startPos = null;
let symmetryMode = false;

// Initialize canvas
function initCanvas() {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);
}

// Tool Selection
function selectTool(tool) {
    currentTool = tool;
    if (tool === 'symmetry') {
        symmetryMode = true;
        currentTool = 'dot';
    } else {
        symmetryMode = false;
    }
}

// Mouse Event Handlers
function handleMouseDown(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    if (currentTool === 'dot') {
        addDot(startPos.x, startPos.y);
    }
}

function handleMouseMove(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const currentPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    if (currentTool === 'line' || currentTool === 'circle') {
        redraw();
        
        if (currentTool === 'line') {
            drawLinePreview(startPos, currentPos);
        } else if (currentTool === 'circle') {
            drawCirclePreview(startPos, currentPos);
        }
    }
}

function handleMouseUp(e) {
    if (!isDrawing) return;
    isDrawing = false;

    const rect = canvas.getBoundingClientRect();
    const endPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    if (currentTool === 'line' && startPos) {
        addLine(startPos, endPos);
    } else if (currentTool === 'circle' && startPos) {
        addCircle(startPos, endPos);
    }

    saveHistory();
    updateStats();
}

// Dot Operations
function addDot(x, y) {
    const color = document.getElementById('dotColor').value;
    const size = parseInt(document.getElementById('brushSize').value);
    
    const dot = { x, y, color, size };
    dots.push(dot);

    if (symmetryMode) {
        // Add mirrored dots (4-fold symmetry)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Mirror along X axis
        dots.push({ x: centerX + (centerX - x), y, color, size });
        // Mirror along Y axis
        dots.push({ x, y: centerY + (centerY - y), color, size });
        // Mirror along both axes
        dots.push({ x: centerX + (centerX - x), y: centerY + (centerY - y), color, size });
    }

    redraw();
}

function removeDot(index) {
    dots.splice(index, 1);
    redraw();
}

// Line Operations
function addLine(start, end) {
    const distance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    
    if (distance < 3) return; // Ignore very short lines

    lines.push({
        start,
        end,
        color: document.getElementById('dotColor').value,
        width: 2
    });

    redraw();
}

// Circle Operations
function addCircle(center, point) {
    const radius = Math.sqrt(
        Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
    );

    if (radius < 3) return;

    circles.push({
        center,
        radius,
        color: document.getElementById('dotColor').value,
        width: 2
    });

    redraw();
}

// Drawing Functions
function redraw() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid();

    // Draw circles
    circles.forEach(circle => {
        ctx.strokeStyle = circle.color;
        ctx.lineWidth = circle.width;
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();
    });

    // Draw lines
    lines.forEach(line => {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
    });

    // Draw dots
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add glow effect
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
    });
}

function drawGrid() {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawLinePreview(start, end) {
    ctx.strokeStyle = document.getElementById('dotColor').value;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
}

function drawCirclePreview(center, point) {
    const radius = Math.sqrt(
        Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
    );
    
    ctx.strokeStyle = document.getElementById('dotColor').value;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.globalAlpha = 1;
}

// Canvas Controls
function clearCanvas() {
    dots = [];
    lines = [];
    circles = [];
    history = [];
    historyStep = -1;
    redraw();
    updateStats();
}

function undoAction() {
    if (historyStep > 0) {
        historyStep--;
        restoreHistory();
    }
}

function redoAction() {
    if (historyStep < history.length - 1) {
        historyStep++;
        restoreHistory();
    }
}

function saveHistory() {
    historyStep++;
    history = history.slice(0, historyStep);
    history.push({
        dots: JSON.parse(JSON.stringify(dots)),
        lines: JSON.parse(JSON.stringify(lines)),
        circles: JSON.parse(JSON.stringify(circles))
    });
}

function restoreHistory() {
    if (historyStep >= 0 && historyStep < history.length) {
        const state = history[historyStep];
        dots = JSON.parse(JSON.stringify(state.dots));
        lines = JSON.parse(JSON.stringify(state.lines));
        circles = JSON.parse(JSON.stringify(state.circles));
        redraw();
        updateStats();
    }
}

// Connect Dots
function connectDots() {
    if (dots.length < 2) {
        alert('Add at least 2 dots to connect');
        return;
    }

    // Sort dots by distance for optimal connection
    lines = [];
    const sortedDots = sortDotsByDistance();

    for (let i = 0; i < sortedDots.length; i++) {
        const current = sortedDots[i];
        const next = sortedDots[(i + 1) % sortedDots.length];

        lines.push({
            start: { x: current.x, y: current.y },
            end: { x: next.x, y: next.y },
            color: current.color,
            width: 2
        });
    }

    saveHistory();
    redraw();
    updateStats();
}

function sortDotsByDistance() {
    if (dots.length === 0) return [];

    const sorted = [dots[0]];
    const remaining = new Set(dots.slice(1));

    while (remaining.size > 0) {
        const lastDot = sorted[sorted.length - 1];
        let nearest = null;
        let minDist = Infinity;

        for (const dot of remaining) {
            const dist = Math.sqrt(
                Math.pow(dot.x - lastDot.x, 2) + Math.pow(dot.y - lastDot.y, 2)
            );
            if (dist < minDist) {
                minDist = dist;
                nearest = dot;
            }
        }

        if (nearest) {
            sorted.push(nearest);
            remaining.delete(nearest);
        }
    }

    return sorted;
}

// Export and Save
function exportAsImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `kolam-${Date.now()}.png`;
    link.click();
}

function saveDesign() {
    const name = prompt('Enter design name:', `Kolam-${new Date().toLocaleDateString()}`);
    if (!name) return;

    const designData = {
        name,
        dots,
        lines,
        circles,
        imageData: canvas.toDataURL(),
        timestamp: new Date()
    };

    // Save to localStorage and server
    localStorage.setItem(`kolam-${Date.now()}`, JSON.stringify(designData));
    
    // Send to backend
    fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(designData)
    })
    .then(res => res.json())
    .then(data => alert('Design saved successfully!'))
    .catch(err => console.error('Error saving design:', err));
}

function updateStats() {
    document.getElementById('dotCount').textContent = dots.length;
    document.getElementById('lineCount').textContent = lines.length;
    
    // Calculate complexity
    const complexity = Math.min((dots.length / 50 + lines.length / 100) * 100, 100);
    document.getElementById('complexity').textContent = Math.round(complexity);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCanvas);
