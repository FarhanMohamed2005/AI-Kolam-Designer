/**
 * Pattern Analyzer Module
 * Handles analysis of kolam patterns
 */

function analyzeDesign() {
    const canvas = document.getElementById('rangoliCanvas');
    const imageData = canvas.toDataURL();

    fetch('/api/patterns/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageData,
            dots,
            connections: lines
        })
    })
    .then(res => res.json())
    .then(data => {
        displayAnalysis(data.data || data);
    })
    .catch(err => {
        console.error('Analysis error:', err);
        displayAnalysis({
            dots: dots,
            connections: lines,
            complexity: Math.round((dots.length / 50 + lines.length / 100) * 100),
            symmetry: { type: 'analyzing', score: 0 },
            principles: {}
        });
    });
}

function displayAnalysis(analysisData) {
    const modal = document.getElementById('analysisModal');
    const content = document.getElementById('modalAnalysisContent');

    let html = `
        <div class="analysis-detailed">
            <h3>Pattern Analysis Results</h3>
            
            <div class="analysis-item">
                <h4>Complexity Score</h4>
                <p>${Math.round(analysisData.complexity || 0)}%</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${analysisData.complexity || 0}%"></div>
                </div>
            </div>
            
            <div class="analysis-item">
                <h4>Symmetry Analysis</h4>
                <p><strong>Type:</strong> ${analysisData.symmetry?.type || 'Not detected'}</p>
                <p><strong>Score:</strong> ${Math.round((analysisData.symmetry?.score || 0) * 100)}%</p>
            </div>
            
            <div class="analysis-item">
                <h4>Design Principles</h4>
                <ul>
    `;

    if (analysisData.principles) {
        for (const [principle, score] of Object.entries(analysisData.principles)) {
            const scorePercent = Math.round(score * 100);
            html += `
                <li>
                    <strong>${principle}:</strong> ${scorePercent}%
                    <div class="principle-bar">
                        <div class="principle-fill" style="width: ${scorePercent}%"></div>
                    </div>
                </li>
            `;
        }
    }

    html += `
                </ul>
            </div>
            
            <div class="analysis-item">
                <h4>Pattern Statistics</h4>
                <p>Total Dots: ${analysisData.dots?.length || dots.length}</p>
                <p>Total Lines: ${analysisData.connections?.length || lines.length}</p>
            </div>
            
            <div class="analysis-item">
                <h4>Recommendations</h4>
                <ul>
                    ${generateRecommendations(analysisData)}
                </ul>
            </div>
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('active');
}

function generateRecommendations(data) {
    const recommendations = [];

    if (!data.dots || data.dots.length < 10) {
        recommendations.push('<li>Add more dots to create a more complex design</li>');
    }

    if (!data.symmetry || data.symmetry.score < 0.6) {
        recommendations.push('<li>Consider using symmetry mode to create more balanced designs</li>');
    }

    if (data.complexity < 30) {
        recommendations.push('<li>This is a simple design - perfect for beginners!</li>');
    } else if (data.complexity < 60) {
        recommendations.push('<li>This is a moderately complex design with good structure</li>');
    } else {
        recommendations.push('<li>This is an advanced design with excellent complexity</li>');
    }

    if (!data.principles || !data.principles.repetition || data.principles.repetition < 0.5) {
        recommendations.push('<li>Try repeating elements to create visual rhythm</li>');
    }

    return recommendations.join('');
}

function closeModal() {
    document.getElementById('analysisModal').classList.remove('active');
}

// Handle image upload and analysis
function handleImageUpload() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            displayPreview(e.target.result);
            analyzeUploadedImage(e.target.result);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayPreview(dataUrl) {
    const container = document.getElementById('previewContainer');
    container.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
}

function analyzeUploadedImage(imageData) {
    fetch('/api/patterns/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData })
    })
    .then(res => res.json())
    .then(data => {
        displayUploadAnalysis(data.data || data);
    })
    .catch(err => {
        console.error('Upload analysis error:', err);
        document.getElementById('analysisResults').innerHTML = 
            '<p>Error analyzing image. Please try again.</p>';
    });
}

function displayUploadAnalysis(data) {
    const resultsDiv = document.getElementById('analysisResults');
    const detailsDiv = document.getElementById('detailedAnalysis');

    const resultsHtml = `
        <h4>Quick Analysis</h4>
        <p><strong>Detected Dots:</strong> ${data.dots?.length || 0}</p>
        <p><strong>Detected Connections:</strong> ${data.connections?.length || 0}</p>
        <p><strong>Complexity:</strong> ${Math.round(data.complexity || 0)}%</p>
        <p><strong>Pattern Type:</strong> ${data.patternType || 'Unknown'}</p>
    `;

    const detailsHtml = `
        <h4>Detailed Information</h4>
        <p><strong>Symmetry Type:</strong> ${data.symmetry?.type || 'None'}</p>
        <p><strong>Symmetry Score:</strong> ${Math.round((data.symmetry?.score || 0) * 100)}%</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <button onclick="reconstructDesign('${JSON.stringify(data.dots || []).replace(/'/g, '&apos;')}')">
            Reconstruct Design
        </button>
    `;

    resultsDiv.innerHTML = resultsHtml;
    detailsDiv.innerHTML = detailsHtml;
}

function reconstructDesign(dotsJson) {
    try {
        console.log('Reconstructing design with dots:', dotsJson);
        
        // Parse the dots JSON string if it's a string
        let designDots = [];
        if (typeof dotsJson === 'string') {
            // The dots JSON is passed as a string with HTML entities escaped
            const unescaped = dotsJson.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
            designDots = JSON.parse(unescaped);
        } else if (Array.isArray(dotsJson)) {
            designDots = dotsJson;
        } else {
            console.error('Invalid dots format:', dotsJson);
            alert('Invalid design format');
            return;
        }
        
        if (!designDots || designDots.length === 0) {
            alert('No dots detected in this pattern. Please try analyzing another image.');
            return;
        }

        console.log('Parsed dots:', designDots);
        
        // Switch to designer tab
        switchTab('designer');
        
        // Wait a moment for tab switch, then update canvas
        setTimeout(() => {
            // Clear current design
            dots = [];
            lines = [];
            circles = [];
            
            // Add reconstructed dots with proper properties
            dots = designDots.map((dot, idx) => ({
                x: typeof dot.x === 'number' ? dot.x : (dot.px || 0),
                y: typeof dot.y === 'number' ? dot.y : (dot.py || 0),
                color: dot.color || '#FFD700',
                size: dot.size || 5,
                confidence: dot.confidence || 0.8
            }));

            console.log('Dots set in canvas:', dots);
            
            // Redraw the canvas
            redraw();
            updateStats();
            
            alert(`Design reconstructed with ${dots.length} dots! You can now edit it.`);
        }, 100);
        
    } catch (err) {
        console.error('Reconstruction error:', err);
        alert('Error reconstructing design. Check console for details.');
    }
}

// Add progress bar styling
const style = document.createElement('style');
style.textContent = `
    .analysis-detailed {
        padding: 20px;
    }

    .analysis-item {
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

    .analysis-item:last-child {
        border-bottom: none;
    }

    .analysis-item h4 {
        color: var(--primary-color);
        margin-bottom: 10px;
    }

    .analysis-item ul {
        list-style-position: inside;
        color: #666;
    }

    .analysis-item li {
        margin: 8px 0;
    }

    .progress-bar, .principle-bar {
        background-color: #f0f0f0;
        border-radius: 10px;
        height: 20px;
        overflow: hidden;
        margin-top: 8px;
    }

    .progress-fill, .principle-fill {
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        height: 100%;
        transition: width 0.3s ease;
    }

    .principle-bar {
        margin-top: 5px;
    }
`;
document.head.appendChild(style);
