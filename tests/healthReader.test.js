const path = require('path');
const fs = require('fs/promises');
const { healthMetricsCounter } = require('../healthReader');

const TEST_FILE = path.join(__dirname, 'test-health.json');

const testData = {
    metrics: [
        { steps: 5000 },
        { steps: 8000 }
    ]
};

beforeAll(async () => {
    await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {
        // It's okay if the file is already gone
    }
});

describe('healthMetricsCounter', () => {
    test('reads a valid JSON file', async () => {
        const result = await healthMetricsCounter(TEST_FILE);
        expect(result).not.toBeNull();
        expect(result.totalHealthEntries).toBe(2);
    });

    test('returns null when the file is missing', async () => {
        const result = await healthMetricsCounter('missing.json');
        expect(result).toBeNull();
    });
});
