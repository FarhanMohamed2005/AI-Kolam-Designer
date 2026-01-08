/**
 * API Communication Module
 * Handles all backend API calls
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Designs API
async function getDesigns() {
    try {
        const response = await fetch(`${API_BASE_URL}/designs`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching designs:', error);
        return [];
    }
}

async function getDesignById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/designs/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching design:', error);
        return null;
    }
}

async function saveDesignToAPI(designData) {
    try {
        const response = await fetch(`${API_BASE_URL}/designs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(designData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving design:', error);
        return null;
    }
}

async function updateDesign(id, designData) {
    try {
        const response = await fetch(`${API_BASE_URL}/designs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(designData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating design:', error);
        return null;
    }
}

async function deleteDesign(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/designs/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting design:', error);
        return null;
    }
}

// Patterns API
async function detectDots(imageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/patterns/detect-dots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error detecting dots:', error);
        return { dots: [] };
    }
}

async function connectDotsAPI(dots, width, height) {
    try {
        const response = await fetch(`${API_BASE_URL}/patterns/connect-dots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dots, width, height })
        });
        return await response.json();
    } catch (error) {
        console.error('Error connecting dots:', error);
        return { connections: [] };
    }
}

async function generateKolamAPI(dots, style, width, height, colors) {
    try {
        const response = await fetch(`${API_BASE_URL}/patterns/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dots, style, width, height, colors })
        });
        return await response.json();
    } catch (error) {
        console.error('Error generating kolam:', error);
        return null;
    }
}

// Analysis API
async function analyzeImageWithAI(imageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/image-analysis-ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error with AI image analysis:', error);
        return { success: false };
    }
}

async function analyzeSymmetry(dots, imageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/symmetry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dots, imageData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error analyzing symmetry:', error);
        return { symmetry: {} };
    }
}

async function detectPatternType(dots, imageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/pattern-type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dots, imageData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error detecting pattern type:', error);
        return { patternType: 'unknown' };
    }
}

async function extractPrinciples(dots, connections) {
    try {
        const response = await fetch(`${API_BASE_URL}/analysis/principles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dots, connections })
        });
        return await response.json();
    } catch (error) {
        console.error('Error extracting principles:', error);
        return { principles: {} };
    }
}

// AI Service Status
async function getAIStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/ai-status`);
        return await response.json();
    } catch (error) {
        console.warn('AI status check failed:', error.message);
        return { enabled: false };
    }
}

// Health Check
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
        const data = await response.json();
        console.log('API Status:', data.status);
        
        // Check AI status
        const aiStatus = await getAIStatus();
        if (aiStatus.enabled && aiStatus.apiKeySet) {
            console.log('🤖 AI Analysis available with', aiStatus.service, 'API');
        }
        
        return true;
    } catch (error) {
        console.warn('API not available:', error.message);
        return false;
    }
}

// Initialize API check on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAPIHealth().then(isHealthy => {
        if (!isHealthy) {
            console.warn('Backend API is not available. Using local processing.');
        }
    });
});
