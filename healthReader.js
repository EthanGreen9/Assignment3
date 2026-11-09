
const fs = require('fs').promises;

async function healthMetricsCounter(filePath) {
    try {
        const text = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(text);

        if (!Array.isArray(data.metrics)) {
            throw new Error('Invalid health data');
        }

        return { totalHealthEntries: data.metrics.length };
    } catch (error) {
        throw new Error('Health data error: ' + error.message);
    }
}

module.exports = { healthMetricsCounter };
