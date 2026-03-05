/**
 * Simple Grid Prompt Endpoint
 * 
 * Handles natural language queries for generic/simple data
 * Converts queries to Ext JS filter configurations using OpenAI
 */

const express = require('express');
const router = express.Router();
const { parseQuery } = require('../services/aiQueryParser');

/**
 * POST /api/simplegrid-prompt
 * 
 * Request:
 * {
 *   "query": "show active users from USA"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "query": "show active users from USA",
 *   "filters": [...],
 *   "sorters": [...]
 * }
 */
router.post('/', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({
            success: false,
            error: 'Query parameter is required'
        });
    }

    console.log('📊 Simple Grid Query:', query);
    const result = await parseQuery(query, 'simple');
    res.json(result);
});

module.exports = router;
