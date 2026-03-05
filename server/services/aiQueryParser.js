/**
 * OpenAI Query Parser
 * 
 * Converts natural language queries to Ext JS filter/sorter configurations
 * using OpenAI GPT API
 */

const OpenAI = require('openai');
require('dotenv').config(); 

const debug = true;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
console.log("Loaded key:", process.env.OPENAI_API_KEY?.slice(0, 10));
/**
 * Creates a prompt template for the specific data domain
 * @param {string} userQuery - The natural language query from user
 * @param {string} domain - The domain (banking, healthcare, school, simple)
 * @returns {string} Formatted prompt for GPT
 */
function createPromptForDomain(userQuery, domain) {
    const domainConfigs = {
        healthcare: {
            fields: 'employee_id (str), name (str), department (list:Cardiology/Dermatology/Emergency/ICU/Lab/Neurology/Oncology/Orthopedics/Pediatric/Radiology/Surgery), role (list: Doctor/Nurse/Technician), shift (list: Morning/Evening/Night), date (date), duration_hours (num), status (list: Assigned/On leave/Available)',
            examples: `
                prompt: show available doctors in the morning
                output: { "filters": [{ "property": "status", "value": "Available", "operator": "eq", "type": "list" }, { "property": "shift", "value": "Morning", "operator": "eq", "type": "list" }], "sorters": [] }
                
                prompt: show personnel assigned for more than 8 hours
                output: { "filters": [{ "property": "duration_hours", "value": { "gt": 8 }, "operator": "gt", "type": "number" }, { "property": "status", "value": "Assigned", "operator": "eq", "type": "list" }], "sorters": [] }
            `
        },
        banking: {
            fields: 'loan_id (str), borrower_name (str), loan_type (list:Personal/Auto/Mortgage/Business/Education), principal_amount (num), interest_rate (num), remaining_balance (num), next_payment_due (date), status (list: Current/Overdue/Closed)',
            examples: `
                prompt: show people that owe more than 5000
                output: { "filters": [{ "property": "remaining_balance", "value": { "gt": 5000 }, "operator": "gt", "type": "number" }], "sorters": [] }
                
                prompt: show overdue personal loans
                output: { "filters": [{ "property": "status", "value": "Overdue", "operator": "eq", "type": "list" }, { "property": "loan_type", "value": "Personal", "operator": "eq", "type": "list" }], "sorters": [] }
            `
        },
        school: {
            fields: 'student_id (str), full_name (str), grade (str), age (num), gender (list:Male/Female), enrollment_date (date), status (list:Active/Inactive), guardian_name (str), guardian_contact (str), avg_score (num), letter_grade (list:A/B/C/D/F)',
            examples: `
                prompt: show active students with grade A
                output: { "filters": [{ "property": "status", "value": "Active", "operator": "eq", "type": "list" }, { "property": "letter_grade", "value": "A", "operator": "eq", "type": "list" }], "sorters": [] }
                
                prompt: show students above 90 average
                output: { "filters": [{ "property": "avg_score", "value": { "gt": 90 }, "operator": "gt", "type": "number" }], "sorters": [{ "property": "avg_score", "direction": "DESC" }] }
            `
        },
        simple: {
            fields: 'name (str), age (num), email (str), status (list:active/pending), country (str), last_month_sales (num), created_at (date)',
            examples: `
                prompt: show active users from USA
                output: { "filters": [{ "property": "status", "value": "active", "operator": "eq", "type": "list" }, { "property": "country", "value": "USA", "operator": "eq", "type": "list" }], "sorters": [] }
                
                prompt: show users with sales over 1000
                output: { "filters": [{ "property": "last_month_sales", "value": { "gt": 1000 }, "operator": "gt", "type": "number" }], "sorters": [{ "property": "last_month_sales", "direction": "DESC" }] }
            `
        }
    };

    const config = domainConfigs[domain] || domainConfigs.banking;

    return `
        Convert natural language to Ext JS 7+ filter JSON.

        Fields: ${config.fields}

        Operators: eq, lt, gt, like, in  
        Types: string, number, date, boolean, list  

        Rules:  
        - Strings: use "like" operator with "type": "string"
        - Lists/Categories: use "eq" operator with "type": "list"
        - Numbers: use lt/gt/eq operators with "type": "number", value as object: { "gt": 5000 }
        - Dates: use lt/gt/eq operators with "type": "date", value as object: { "gt": "2021-03-01" }
        - No wildcards or % signs
        - Use double quotes in JSON
        - Compatible with Ext JS filters
        - filters must be inside "filters" array parameter
        - sorters must be inside "sorters" array parameter
        - Each filter must have: property, type, operator, value
        - Each sorter must have: property, direction (ASC/DESC)

        Examples:
        ${config.examples}

        Input: "${userQuery}" 
        
        Output: Return ONLY valid JSON object with "filters" array and "sorters" array. No markdown, no explanation.
    `;
}

/**
 * Parse a natural language query using OpenAI
 * @param {string} query - User's natural language query
 * @param {string} domain - Domain context (banking, healthcare, school, simple)
 * @returns {Promise<Object>} Parsed filters and sorters
 */
async function parseQuery(query, domain = 'banking') {
    const prompt = createPromptForDomain(query, domain);

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-5-mini', //your choice of model, e.g. gpt-4, gpt-3.5-turbo, gpt-5-mini
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert at converting natural language queries to Ext JS filter configurations. Always return valid JSON only.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.3 // Lower temperature for more consistent JSON output
        });

        // Validate response structure
        if (!completion?.choices?.[0]?.message?.content) {
            throw new Error('Invalid GPT response structure');
        }

        const gptText = completion.choices[0].message.content;
        if (debug) console.log('🤖 GPT Response:', gptText);

        // Extract JSON from response (handles markdown code blocks)
        let json;
        const jsonMatch = gptText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON found in GPT response');
        }

        json = JSON.parse(jsonMatch[0]);

        // Ensure response has required structure
        if (!json.filters) json.filters = [];
        if (!json.sorters) json.sorters = [];

        return {
            success: true,
            query: query,
            filters: json.filters || [],
            sorters: json.sorters || []
        };

    } catch (error) {
        console.error('❌ Error parsing query:', error.message);
        return {
            success: false,
            query: query,
            filters: [],
            sorters: [],
            error: error.message
        };
    }
}

module.exports = { parseQuery, createPromptForDomain };
