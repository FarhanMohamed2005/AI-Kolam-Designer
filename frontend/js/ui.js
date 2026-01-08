/**
 * UI Management Module
 * Handles tab switching and UI interactions
 */

function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.style.backgroundColor = '';
        link.style.color = '';
    });

    event?.target?.style.setProperty('background-color', 'var(--primary-color)');
    event?.target?.style.setProperty('color', 'white');
}

function changeStyle() {
    const style = document.getElementById('styleSelect').value;
    console.log('Style changed to:', style);
    // Apply style changes to the design
}

function loadDesigns() {
    console.log('Loading designs from server...');
    getDesigns().then(designs => {
        console.log('Designs loaded:', designs);
        displayGallery(designs);
    }).catch(err => {
        console.error('Error loading designs:', err);
        document.getElementById('designsGallery').innerHTML = '<p>Error loading designs. Please try again.</p>';
    });
}

function displayGallery(designs) {
    const gallery = document.getElementById('designsGallery');
    
    if (!designs || designs.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #999;">No designs saved yet. Create one in the Designer tab!</p>';
        return;
    }

    let html = '';
    designs.forEach(design => {
        const designId = design._id || design.id;
        const displayName = design.name || `Design #${designId}`;
        const date = design.createdAt ? new Date(design.createdAt).toLocaleDateString() : 'Unknown date';
        
        html += `
            <div class="gallery-item" onclick="loadDesignFromGallery('${designId}')">
                <img src="${design.imageData || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2214%22%3EPreview Unavailable%3C/text%3E%3C/svg%3E'}" alt="${displayName}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22150%22/%3E%3C/svg%3E'">
                <div class="gallery-item-info">
                    <h4>${displayName}</h4>
                    <p>${date}</p>
                    <button onclick="deleteDesignFromGallery(event, '${designId}')">Delete</button>
                </div>
            </div>
        `;
    });

    gallery.innerHTML = html;
}

function loadDesignFromGallery(designId) {
    console.log('Loading design:', designId);
    getDesignById(designId).then(design => {
        if (design) {
            console.log('Design loaded:', design);
            // Load design into canvas
            if (design.dots && Array.isArray(design.dots)) {
                dots = design.dots.map(dot => ({
                    x: dot.x || 0,
                    y: dot.y || 0,
                    color: dot.color || '#FFD700',
                    size: dot.size || 5
                }));
            } else {
                dots = [];
            }
            
            if (design.lines && Array.isArray(design.lines)) {
                lines = design.lines;
            } else {
                lines = [];
            }
            
            if (design.circles && Array.isArray(design.circles)) {
                circles = design.circles;
            } else {
                circles = [];
            }
            
            redraw();
            updateStats();
            switchTab('designer');
            alert(`Loaded: ${design.name || 'Design'}`);
        } else {
            alert('Could not load design');
        }
    }).catch(err => {
        console.error('Error loading design:', err);
        alert('Error loading design. Check console for details.');
    });
}

function deleteDesignFromGallery(event, designId) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this design?')) {
        fetch(`/api/designs/${designId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Design deleted successfully');
            loadDesigns(); // Refresh the gallery
        })
        .catch(err => {
            console.error('Error deleting design:', err);
            alert('Error deleting design');
        });
    }
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('analysisModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'z':
                e.preventDefault();
                undoAction();
                break;
            case 'y':
                e.preventDefault();
                redoAction();
                break;
            case 's':
                e.preventDefault();
                saveDesign();
                break;
        }
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set first tab as active
    switchTab('designer');
    
    // Initialize canvas
    redraw();
    updateStats();

    console.log('UI initialized');
});
