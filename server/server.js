// Load environment variables from .env file FIRST
require('dotenv').config();

// Debug: Show environment loading
console.log('🔍 Environment Variables Loaded:');
console.log('   OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Present' : '❌ Missing');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('   PORT (env):', process.env.PORT || 'not set');

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Port configuration (from .env or default to 8080)
const PORT = process.env.PORT || 8080;
console.log(`📍 Starting on PORT: ${PORT}`);

// Middleware to serve static files from parent directory
app.use(express.static(path.join(__dirname, '..')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: CORS is disabled - no Access-Control-Allow-Origin headers are set
// This means cross-origin requests will be blocked by the browser

// Helper function to load data from JSON files
function loadDataFile(filename) {
  const dataPath = path.join(__dirname, '..', 'resources', 'data', filename);
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return { success: false, data: [], count: 0, error: 'Failed to load data' };
  }
}

// ==================== Data Loading Endpoints ====================

// Banking Data
app.get('/api/banking-data', (req, res) => {
  const data = loadDataFile('BankingData.json');
  res.json(data);
});

// Healthcare Data
app.get('/api/healthcare-data', (req, res) => {
  const data = loadDataFile('HealthCareGrid.json');
  res.json(data);
});

// School Data
app.get('/api/school-data', (req, res) => {
  const data = loadDataFile('SchoolGrid.json');
  res.json(data);
});

// Simple Data
app.get('/api/simple-data', (req, res) => {
  const data = loadDataFile('SimpleData.json');
  res.json(data);
});

// ==================== AI Prompt Endpoints (NL Query Processing) ====================

// Check if OpenAI API key is configured
const hasOpenAIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '';

if (hasOpenAIKey) {
  console.log('✅ OpenAI API key detected - AI endpoints enabled');
  
  // Import endpoint handlers for AI-powered NL query processing
  const bankingPrompt = require('./endpoints/bankingPrompt');
  const healthcarePrompt = require('./endpoints/healthcarePrompt');
  const schoolPrompt = require('./endpoints/schoolPrompt');
  const simpleGridPrompt = require('./endpoints/simpleGridPrompt');
  
  // Mount AI-powered endpoints
  app.use('/api/banking-prompt', bankingPrompt);
  app.use('/api/healthcare-prompt', healthcarePrompt);
  app.use('/api/school-prompt', schoolPrompt);
  app.use('/api/simplegrid-prompt', simpleGridPrompt);
  
} else {
  console.log('⚠️  OpenAI API key not configured - Using mock endpoints');
  console.log('💡 To enable AI features, set OPENAI_API_KEY environment variable');
  
  // Mock endpoints (placeholder responses when AI is not configured)
  const mockPromptHandler = (domainName) => {
    return (req, res) => {
      const { query } = req.body;
      console.log(`${domainName} query received (mock mode):`, query);
      
      res.json({
        success: true,
        query: query,
        filters: [],
        sorters: [],
        message: `${domainName} prompt processed (mock - AI not configured, set OPENAI_API_KEY)`
      });
    };
  };
  
  app.post('/api/banking-prompt', mockPromptHandler('Banking'));
  app.post('/api/healthcare-prompt', mockPromptHandler('Healthcare'));
  app.post('/api/school-prompt', mockPromptHandler('School'));
  app.post('/api/simplegrid-prompt', mockPromptHandler('Simple Grid'));
}

// ==================== Personnel Endpoints (Legacy) ====================

app.get('/api/personnel', (req, res) => {
  const personnelData = [
    { id: 1, name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
    { id: 2, name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
    { id: 3, name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
    { id: 4, name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
  ];
  res.json({
    success: true,
    message: 'Personnel data retrieved',
    data: personnelData
  });
});

app.post('/api/personnel', (req, res) => {
  res.json({
    success: true,
    message: 'Personnel record created',
    data: req.body
  });
});

app.put('/api/personnel/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Personnel record updated',
    id: req.params.id,
    data: req.body
  });
});

app.delete('/api/personnel/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Personnel record deleted',
    id: req.params.id
  });
});

// Catch-all route for SPA - serves index.html for any route not matching static files and API
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`========================================`);
  console.log('CORS is disabled - same-origin requests only\n');
  console.log('📊 Data Loading Endpoints:');
  console.log('  GET  /api/banking-data       - Load banking data');
  console.log('  GET  /api/healthcare-data    - Load healthcare data');
  console.log('  GET  /api/school-data        - Load school data');
  console.log('  GET  /api/simple-data        - Load simple data');
  console.log('\n🤖 AI Query Processing Endpoints:');
  console.log('  POST /api/banking-prompt     - Process banking NL queries');
  console.log('  POST /api/healthcare-prompt  - Process healthcare NL queries');
  console.log('  POST /api/school-prompt      - Process school NL queries');
  console.log('  POST /api/simplegrid-prompt  - Process simple NL queries');
  console.log(`\n${hasOpenAIKey ? '✅ AI Mode: ENABLED' : '⚠️  AI Mode: DISABLED (set OPENAI_API_KEY)'}`);
  console.log(`========================================\n`);
});
