const fs = require('fs/promises');

async function healthMetricsCounter(filePath) {
    try {
        const text = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(text);

        return { totalHealthEntries: data.metrics.length };

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found');
        } else if (error.name === 'SyntaxError') {
            console.log('Invalid JSON');
        } else {
            console.log('Unknown error:', error.message);
        }
        return null;
    }
}

module.exports = { healthMetricsCounter };
