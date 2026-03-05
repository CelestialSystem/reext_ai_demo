/**
 * Banking Prompt Endpoint
 * 
 * Handles natural language queries for banking/loan data
 * Converts queries to Ext JS filter configurations using OpenAI
 */

const express = require('express');
const router = express.Router();
const { parseQuery } = require('../services/aiQueryParser');

/**
 * POST /api/banking-prompt
 * 
 * Request:
 * {
 *   "query": "show people that owe more than 5000"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "query": "show people that owe more than 5000",
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

    console.log('🏦 Banking Query:', query);
    const result = await parseQuery(query, 'banking');
    res.json(result);
});

module.exports = router;
