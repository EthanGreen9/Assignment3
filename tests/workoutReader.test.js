const path = require('path');
const fs = require('fs');
const { workoutCalculator } = require('../workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workouts.csv');

const testCsvData = `duration
30
45
60`;

beforeAll(async () => {
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(async () => {
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {
        // It's okay if the file doesn't exist
    }
});

describe('CSV Workout Processing', () => {
    test('reads and processes valid CSV file', async () => {
        const result = await workoutCalculator(TEST_CSV_FILE);
        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(3);
        expect(result.totalMinutes).toBe(135);
    });

    test('handles missing files', async () => {
        const result = await workoutCalculator('missing.csv');
        expect(result).toBeNull();
    });
});
