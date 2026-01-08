// Simple model for storing Kolam designs
// Using in-memory storage with persistence

class KolamDesignModel {
  constructor() {
    this.designs = [];
    this.idCounter = 0;
    this.loadFromStorage();
  }

  loadFromStorage() {
    // Load from localStorage-like structure
    try {
      const stored = global.designStorage || [];
      this.designs = stored;
      if (stored.length > 0) {
        this.idCounter = Math.max(...stored.map(d => d.id || 0));
      }
    } catch (err) {
      console.error('Error loading storage:', err);
      this.designs = [];
    }
  }

  saveToStorage() {
    // Save to global storage
    global.designStorage = this.designs;
  }

  // Create
  async create(data) {
    const id = ++this.idCounter;
    const design = {
      _id: id.toString(),
      id,
      name: data.name || `Kolam-${new Date().toLocaleDateString()}`,
      dots: data.dots || [],
      lines: data.lines || [],
      circles: data.circles || [],
      connections: data.connections || [],
      imageData: data.imageData || '',
      style: data.style || 'traditional',
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date()
    };
    this.designs.push(design);
    this.saveToStorage();
    return design;
  }

  // Read all
  async find(query = {}) {
    this.loadFromStorage();
    return this.designs.slice().reverse(); // Most recent first
  }

  // Read with limit
  async findWithLimit(limit = 20) {
    this.loadFromStorage();
    return this.designs.slice(-limit).reverse();
  }

  // Read one
  async findById(id) {
    this.loadFromStorage();
    const design = this.designs.find(d => d._id === id || d.id === parseInt(id));
    return design || null;
  }

  // Update
  async findByIdAndUpdate(id, data) {
    this.loadFromStorage();
    const index = this.designs.findIndex(d => d._id === id || d.id === parseInt(id));
    if (index === -1) return null;
    
    const updated = { 
      ...this.designs[index], 
      ...data,
      updatedAt: new Date()
    };
    this.designs[index] = updated;
    this.saveToStorage();
    return updated;
  }

  // Delete
  async findByIdAndDelete(id) {
    this.loadFromStorage();
    const index = this.designs.findIndex(d => d._id === id || d.id === parseInt(id));
    if (index !== -1) {
      this.designs.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Save (for use with 'new' keyword)
  async save() {
    this.saveToStorage();
    return this;
  }

  // Get count
  async count() {
    this.loadFromStorage();
    return this.designs.length;
  }

  // Clear all
  async clearAll() {
    this.designs = [];
    this.idCounter = 0;
    this.saveToStorage();
  }
}

// Create singleton instance
const kolamDesign = new KolamDesignModel();

module.exports = kolamDesign;
