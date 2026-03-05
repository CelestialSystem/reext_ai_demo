/**
 * School Prompt Endpoint
 * 
 * Handles natural language queries for school/student data
 * Converts queries to Ext JS filter configurations using OpenAI
 */

const express = require('express');
const router = express.Router();
const { parseQuery } = require('../services/aiQueryParser');

/**
 * POST /api/school-prompt
 * 
 * Request:
 * {
 *   "query": "show active students with grade A"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "query": "show active students with grade A",
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

    console.log('🎓 School Query:', query);
    const result = await parseQuery(query, 'school');
    res.json(result);
});

module.exports = router;
