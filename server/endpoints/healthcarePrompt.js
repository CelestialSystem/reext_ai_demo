/**
 * Healthcare Prompt Endpoint
 * 
 * Handles natural language queries for healthcare/employee data
 * Converts queries to Ext JS filter configurations using OpenAI
 */

const express = require('express');
const router = express.Router();
const { parseQuery } = require('../services/aiQueryParser');

/**
 * POST /api/healthcare-prompt
 * 
 * Request:
 * {
 *   "query": "show available doctors in the morning"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "query": "show available doctors in the morning",
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

    console.log('🏥 Healthcare Query:', query);
    const result = await parseQuery(query, 'healthcare');
    res.json(result);
});

module.exports = router;
