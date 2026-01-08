# 🔑 API Integration Guide - AI Kolam Designer

## Overview
The AI Kolam Designer now supports integration with multiple AI image analysis services to provide intelligent pattern recognition and suggestions for Kolam designs.

---

## 📌 **WHERE TO PASTE YOUR API KEY**

### Location: `.env` file in project root

```
c:\Users\moham\Downloads\AI Rangoli Designer\.env
```

Open this file and paste your API key on the `OPENAI_API_KEY` line:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 **SUPPORTED AI SERVICES**

### 1. **OpenAI API** (Recommended) ⭐
**Best for:** Advanced image analysis and pattern suggestions

#### How to Get API Key:
1. Go to: https://platform.openai.com/api-keys
2. Sign in or create an OpenAI account
3. Click **"Create new secret key"**
4. Copy the entire key (starts with `sk-`)
5. Paste it in `.env` file: `OPENAI_API_KEY=sk-...`

#### Features:
- GPT-4 Vision for intelligent pattern recognition
- Analyzes image composition and suggests Kolam patterns
- Provides shape, color, and symmetry recommendations
- Returns structured JSON analysis

**Cost:** Pay-as-you-go (~$0.01-0.03 per image analysis)

---

### 2. **Google Cloud Vision API** (Optional)
**Best for:** Fast object and label detection

#### How to Get API Key:
1. Go to: https://cloud.google.com/vision/docs
2. Create a Google Cloud project
3. Enable the Vision API
4. Create a service account and download credentials JSON
5. Paste key in `.env`: `GOOGLE_VISION_API_KEY=...`

#### Features:
- Label detection
- Object localization
- Color analysis

---

### 3. **Anthropic Claude API** (Optional)
**Best for:** Detailed creative analysis

#### How to Get API Key:
1. Go to: https://console.anthropic.com/
2. Create an account
3. Navigate to API keys
4. Create new key
5. Paste in `.env`: `ANTHROPIC_API_KEY=...`

#### Features:
- Claude 3 Vision for creative pattern suggestions
- Detailed Kolam design recommendations

---

## ⚙️ **SETUP STEPS**

### Step 1: Create `.env` File
```bash
# The .env file already exists in the project root
# You just need to add your API key to it
```

### Step 2: Add Your API Key
Edit: `c:\Users\moham\Downloads\AI Rangoli Designer\.env`

```env
# Choose ONE primary service
OPENAI_API_KEY=sk-your-api-key-here
# GOOGLE_VISION_API_KEY=your-google-key
# ANTHROPIC_API_KEY=your-anthropic-key

# Settings (optional)
ENABLE_AI_ANALYSIS=true
AI_SERVICE=openai
```

### Step 3: Restart Backend Server
```bash
cd "c:\Users\moham\Downloads\AI Rangoli Designer\backend"
npm start
```

### Step 4: Verify Configuration
When the server starts, you should see:
```
✅ OpenAI API configured
```

---

## 🎯 **HOW TO USE IT**

Once configured, the AI features activate automatically:

### In the Analyzer Tab:
1. Upload an image
2. The system will:
   - Use AI to analyze the image intelligently
   - Suggest Kolam patterns based on the image
   - Extract shapes, colors, and symmetry info
   - Fall back to local analysis if API fails

### In the Designer Tab:
- Enhanced suggestions for pattern improvements
- AI-powered design recommendations

---

## 🔒 **SECURITY BEST PRACTICES**

### ⚠️ Important:
- **NEVER commit `.env` file to GitHub** (already added to `.gitignore`)
- **NEVER share your API keys** in code, commits, or issues
- **Keep API key confidential** - if exposed, regenerate immediately
- **Add spending limits** in your API provider's dashboard

### Checking Git Status:
```bash
cd "c:\Users\moham\Downloads\AI Rangoli Designer"
git status
```

Should show `.env` is NOT listed (it's ignored).

---

## 💰 **PRICING ESTIMATE**

### OpenAI (GPT-4 Vision)
- **$0.01-0.03** per image analysis
- ~100-300 images per $1 USD
- Free tier: No free usage, but very cheap

### Google Cloud Vision
- **Free:** 1,000 requests/month
- **Paid:** $1.50 per 1,000 additional requests
- Great for free tier projects

### Anthropic Claude
- **$3-15** per million input tokens
- Variable based on model used

---

## 🧪 **TESTING YOUR SETUP**

### Check if API is configured:
1. Open browser to: `http://localhost:5000/api/ai-status`
2. Should show:
```json
{
  "enabled": true,
  "service": "openai",
  "configured": true,
  "apiKeySet": true
}
```

### Test with an image:
1. Go to Analyzer tab
2. Upload an image
3. Check browser console (F12) for messages:
   - `✅ AI Analysis successful` = Working
   - `⚠️ AI Analysis failed` = Check API key or billing

---

## ❓ **TROUBLESHOOTING**

### Issue: "AI Analysis disabled"
**Solution:** Check `.env` file has:
```env
ENABLE_AI_ANALYSIS=true
```

### Issue: "OPENAI_API_KEY not set"
**Solution:** Paste API key in `.env`:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

### Issue: API returns 401/403 error
**Solutions:**
- Verify API key is correct (no extra spaces)
- Check API key hasn't expired in provider's dashboard
- Verify you have credits/billing set up

### Issue: Rate limit exceeded
**Solution:**
- Add delay between requests
- Increase API quota in provider's dashboard
- Switch to a different AI service

---

## 📊 **MONITORING API USAGE**

### OpenAI Dashboard:
- https://platform.openai.com/usage

### Google Cloud:
- Cloud Console → Billing → Reports

### Anthropic:
- https://console.anthropic.com/

---

## 🔄 **SWITCHING AI SERVICES**

To switch from OpenAI to Google Vision:

1. Edit `.env`:
```env
AI_SERVICE=google
GOOGLE_VISION_API_KEY=your-google-key-here
```

2. Restart server:
```bash
npm start
```

---

## 📝 **ENVIRONMENT VARIABLES REFERENCE**

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API authentication | If using OpenAI | `sk-...` |
| `GOOGLE_VISION_API_KEY` | Google Vision API key | If using Google | `AIza...` |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | If using Anthropic | `sk-ant...` |
| `ENABLE_AI_ANALYSIS` | Enable/disable AI features | No (default: true) | `true` or `false` |
| `AI_SERVICE` | Primary AI service | No (default: openai) | `openai`, `google`, `anthropic` |

---

## 🎓 **WHAT EACH SERVICE ANALYZES**

### OpenAI (Recommended)
```
✓ Pattern shapes and structures
✓ Symmetry analysis
✓ Suggested dot count and arrangement
✓ Color palette recommendations
✓ Complexity assessment
✓ Creative design suggestions
```

### Google Vision
```
✓ Object detection and labels
✓ Color properties
✓ Image properties
✓ Geometric shapes
```

### Anthropic Claude
```
✓ Creative pattern interpretation
✓ Cultural design context
✓ Artistic recommendations
✓ Composition analysis
```

---

## 🚀 **NEXT STEPS**

1. **Get your API key** from your chosen service
2. **Edit `.env` file** and paste the key
3. **Restart the backend server**
4. **Test it** by uploading an image
5. **Monitor usage** in your provider's dashboard

---

## 📞 **SUPPORT**

For API-specific issues:
- **OpenAI Help:** https://help.openai.com/
- **Google Support:** https://support.google.com/
- **Anthropic Support:** https://support.anthropic.com/

---

**Status:** ✅ Ready to configure  
**Last Updated:** January 8, 2026
