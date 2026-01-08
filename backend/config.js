/**
 * Environment Configuration Module
 * Loads and manages API keys and settings from .env file
 */

require('dotenv').config();

const config = {
  // API Keys
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  googleVisionApiKey: process.env.GOOGLE_VISION_API_KEY || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',

  // Settings
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  enableAIAnalysis: process.env.ENABLE_AI_ANALYSIS === 'true',
  aiService: process.env.AI_SERVICE || 'openai',

  // API Configuration
  apiConfig: {
    openai: {
      baseURL: 'https://api.openai.com/v1',
      model: 'gpt-4-vision-preview',
      maxTokens: 1024
    },
    google: {
      baseURL: 'https://vision.googleapis.com/v1/images:annotate',
      features: ['LABEL_DETECTION', 'OBJECT_LOCALIZATION', 'IMAGE_PROPERTIES']
    },
    anthropic: {
      baseURL: 'https://api.anthropic.com/v1',
      model: 'claude-3-vision-sonnet-20240229'
    }
  }
};

// Validate API Key is set
const validateApiKey = () => {
  const service = config.aiService.toLowerCase();
  
  if (!config.enableAIAnalysis) {
    console.warn('⚠️  AI Analysis is disabled. Enable ENABLE_AI_ANALYSIS=true in .env');
    return false;
  }

  switch (service) {
    case 'openai':
      if (!config.openaiApiKey) {
        console.error('❌ OPENAI_API_KEY not set in .env file');
        return false;
      }
      console.log('✅ OpenAI API configured');
      return true;
    case 'google':
      if (!config.googleVisionApiKey) {
        console.error('❌ GOOGLE_VISION_API_KEY not set in .env file');
        return false;
      }
      console.log('✅ Google Vision API configured');
      return true;
    case 'anthropic':
      if (!config.anthropicApiKey) {
        console.error('❌ ANTHROPIC_API_KEY not set in .env file');
        return false;
      }
      console.log('✅ Anthropic Claude API configured');
      return true;
    default:
      console.warn(`⚠️  Unknown AI service: ${service}`);
      return false;
  }
};

module.exports = {
  config,
  validateApiKey
};
