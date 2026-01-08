/**
 * AI Analysis Service Module
 * Integrates with OpenAI, Google Vision, or Anthropic APIs for enhanced image analysis
 */

const { config, validateApiKey } = require('../config');

class AIAnalysisService {
  constructor() {
    this.apiKey = null;
    this.service = config.aiService.toLowerCase();
    this.enabled = config.enableAIAnalysis && validateApiKey();
  }

  /**
   * Analyze image using OpenAI Vision API
   */
  async analyzeWithOpenAI(imageDataUrl) {
    if (!config.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this image and describe it as if it were a Kolam (Indian decorative art pattern). 
                  Identify: 
                  1. Main shapes and patterns
                  2. Symmetry type (radial, linear, both)
                  3. Suggested dot count and arrangement
                  4. Color palette recommendations
                  5. Complexity level (1-10)
                  
                  Respond in JSON format:
                  {
                    "description": "...",
                    "shapes": [...],
                    "symmetry": "...",
                    "dotCount": number,
                    "arrangement": "...",
                    "colors": [...],
                    "complexity": number,
                    "suggestions": "..."
                  }`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageDataUrl,
                  },
                },
              ],
            },
          ],
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: content };
    } catch (error) {
      console.error('OpenAI Analysis Error:', error);
      throw error;
    }
  }

  /**
   * Analyze image using Google Vision API
   */
  async analyzeWithGoogle(imageDataUrl) {
    if (!config.googleVisionApiKey) {
      throw new Error('Google Vision API key not configured');
    }

    try {
      const base64Image = imageDataUrl.split(',')[1];
      
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${config.googleVisionApiKey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  { type: 'LABEL_DETECTION', maxResults: 10 },
                  { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
                  { type: 'IMAGE_PROPERTIES' },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Google Vision API error: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.responses[0];

      return {
        labels: result.labelAnnotations || [],
        objects: result.localizedObjectAnnotations || [],
        colors: result.imagePropertiesAnnotation?.dominantColors?.colors || [],
        description: 'Image analyzed using Google Vision API'
      };
    } catch (error) {
      console.error('Google Vision Analysis Error:', error);
      throw error;
    }
  }

  /**
   * Main analysis method - routes to appropriate API
   */
  async analyzeImage(imageDataUrl) {
    if (!this.enabled) {
      console.warn('AI Analysis disabled. Using local pattern recognition.');
      return null;
    }

    try {
      console.log(`🤖 Analyzing image with ${this.service} API...`);

      switch (this.service) {
        case 'openai':
          return await this.analyzeWithOpenAI(imageDataUrl);
        case 'google':
          return await this.analyzeWithGoogle(imageDataUrl);
        case 'anthropic':
          return await this.analyzeWithAnthropic(imageDataUrl);
        default:
          console.warn(`Unknown AI service: ${this.service}`);
          return null;
      }
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return null; // Fall back to local analysis
    }
  }

  /**
   * Analyze image using Anthropic Claude API
   */
  async analyzeWithAnthropic(imageDataUrl) {
    if (!config.anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const base64Image = imageDataUrl.split(',')[1];
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': config.anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-vision-sonnet-20240229',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: 'image/jpeg',
                    data: base64Image,
                  },
                },
                {
                  type: 'text',
                  text: `Analyze this image as if creating a Kolam (Indian decorative art). 
                  Provide: shapes, symmetry type, suggested dots, colors, and complexity.
                  Respond in JSON format.`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content[0].text;
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: content };
    } catch (error) {
      console.error('Anthropic Analysis Error:', error);
      throw error;
    }
  }

  /**
   * Check if AI service is properly configured
   */
  isConfigured() {
    return this.enabled;
  }

  /**
   * Get current AI service status
   */
  getStatus() {
    return {
      enabled: this.enabled,
      service: this.service,
      configured: this.enabled,
      apiKeySet: this.enabled && !!config[`${this.service}ApiKey`]
    };
  }
}

module.exports = new AIAnalysisService();
