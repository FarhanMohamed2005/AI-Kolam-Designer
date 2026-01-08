# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently no authentication required. Future versions will support JWT.

---

## Designs Endpoints

### 1. Get All Designs
```http
GET /designs
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Traditional Mandala",
    "dots": [...],
    "connections": [...],
    "imageData": "data:image/png;base64,...",
    "style": "traditional",
    "createdAt": "2024-01-07T10:30:00Z"
  }
]
```

### 2. Get Design by ID
```http
GET /designs/:id
```

**Parameters:**
- `id` (string, required): Design ID

**Response:**
```json
{
  "id": 1,
  "name": "Traditional Mandala",
  "dots": [{"x": 100, "y": 100, "color": "#FF6B9D", "size": 5}],
  ...
}
```

### 3. Create New Design
```http
POST /designs
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "My Rangoli",
  "dots": [
    {"x": 100, "y": 100, "color": "#FF6B9D", "size": 5},
    {"x": 150, "y": 150, "color": "#C44569", "size": 5}
  ],
  "connections": [
    {"from": {"x": 100, "y": 100}, "to": {"x": 150, "y": 150}}
  ],
  "imageData": "data:image/png;base64,...",
  "style": "traditional"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Rangoli",
  "createdAt": "2024-01-07T10:30:00Z",
  ...
}
```

### 4. Update Design
```http
PUT /designs/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string, required): Design ID

**Request Body:**
```json
{
  "name": "Updated Rangoli",
  "dots": [...],
  "connections": [...]
}
```

### 5. Delete Design
```http
DELETE /designs/:id
```

**Parameters:**
- `id` (string, required): Design ID

**Response:**
```json
{
  "message": "Design deleted"
}
```

---

## Patterns Endpoints

### 1. Analyze Image/Canvas
```http
POST /patterns/analyze
Content-Type: application/json
```

**Request Body:**
```json
{
  "imageData": "data:image/png;base64,...",
  "mode": "image"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dots": [...],
    "connections": [...],
    "symmetry": {
      "type": "rotational",
      "score": 0.85,
      "center": {"x": 250, "y": 250}
    },
    "principles": {
      "repetition": 0.8,
      "balance": 0.7,
      "symmetry": 0.85,
      "emphasis": 0.6,
      "harmony": 0.75,
      "proportion": 0.8
    },
    "complexity": 65
  },
  "timestamp": "2024-01-07T10:30:00Z"
}
```

### 2. Detect Dots
```http
POST /patterns/detect-dots
Content-Type: application/json
```

**Request Body:**
```json
{
  "imageData": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "dots": [
    {"x": 100, "y": 100, "color": "#FF6B9D", "size": 5},
    {"x": 150, "y": 150, "color": "#C44569", "size": 5}
  ],
  "count": 2
}
```

### 3. Connect Dots
```http
POST /patterns/connect-dots
Content-Type: application/json
```

**Request Body:**
```json
{
  "dots": [
    {"x": 100, "y": 100},
    {"x": 150, "y": 150},
    {"x": 200, "y": 100}
  ],
  "width": 600,
  "height": 600
}
```

**Response:**
```json
{
  "success": true,
  "connections": [
    {
      "from": {"x": 100, "y": 100},
      "to": {"x": 150, "y": 150},
      "distance": 70.7,
      "type": "line"
    },
    {
      "from": {"x": 150, "y": 150},
      "to": {"x": 200, "y": 100},
      "distance": 70.7,
      "type": "line"
    }
  ]
}
```

### 4. Generate Rangoli
```http
POST /patterns/generate
Content-Type: application/json
```

**Request Body:**
```json
{
  "dots": [...],
  "style": "traditional",
  "width": 600,
  "height": 600,
  "colors": ["#FF6B9D", "#C44569", "#F8B500"]
}
```

**Response:**
```json
{
  "success": true,
  "image": {
    "width": 600,
    "height": 600,
    "dots": [...],
    "connections": [...],
    "style": "traditional",
    "colors": ["#FF6B9D", "#C44569", "#F8B500"]
  }
}
```

---

## Analysis Endpoints

### 1. Analyze Symmetry
```http
POST /analysis/symmetry
Content-Type: application/json
```

**Request Body:**
```json
{
  "dots": [...],
  "imageData": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "symmetry": {
    "type": "rotational",
    "score": 0.85,
    "rotational": 0.85,
    "reflection": 0.3,
    "center": {"x": 250, "y": 250}
  }
}
```

### 2. Detect Pattern Type
```http
POST /analysis/pattern-type
Content-Type: application/json
```

**Request Body:**
```json
{
  "dots": [...],
  "imageData": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "patternType": "mandala"
}
```

**Possible Types:**
- `simple` - Less than 10 dots
- `mandala` - Highly symmetrical
- `symmetric` - Symmetrical but not mandala
- `geometric` - Regular geometric arrangement
- `freeform` - Irregular arrangement
- `unknown` - Could not determine

### 3. Extract Design Principles
```http
POST /analysis/principles
Content-Type: application/json
```

**Request Body:**
```json
{
  "dots": [...],
  "connections": [...]
}
```

**Response:**
```json
{
  "success": true,
  "principles": {
    "repetition": 0.8,
    "balance": 0.7,
    "symmetry": 0.85,
    "emphasis": 0.6,
    "harmony": 0.75,
    "proportion": 0.8
  }
}
```

---

## Health Check

### Check API Status
```http
GET /health
```

**Response:**
```json
{
  "status": "API is running"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Image data required"
}
```

### 404 - Not Found
```json
{
  "error": "Design not found"
}
```

### 500 - Server Error
```json
{
  "error": "Server error",
  "message": "Detailed error message"
}
```

---

## Data Models

### Dot
```typescript
{
  x: number;           // X coordinate
  y: number;           // Y coordinate
  color?: string;      // Hex color code
  size?: number;       // Radius in pixels
  px?: number;         // Alternative x property
  py?: number;         // Alternative y property
}
```

### Connection/Line
```typescript
{
  from: {x: number, y: number};
  to: {x: number, y: number};
  distance?: number;
  color?: string;
  width?: number;
  type?: 'line' | 'curve';
}
```

### Design
```typescript
{
  id?: string | number;
  name: string;
  dots: Dot[];
  connections?: Connection[];
  circles?: Circle[];
  imageData?: string;  // Base64 encoded image
  style?: string;      // 'traditional' | 'geometric' | 'floral' | 'modern'
  colors?: string[];   // Array of hex colors
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## Rate Limiting

Currently not implemented. Future versions will include rate limiting per IP.

## CORS

CORS is enabled for all origins in development. Configure as needed for production.

## Pagination

Not yet implemented. Future enhancement for large datasets.

---

**Last Updated:** January 2024
**API Version:** 1.0.0
