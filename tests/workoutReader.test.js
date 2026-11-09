
const { workoutCalculator } = require('../workoutReader');

test('counts workouts and minutes', async () => {
    const result = await workoutCalculator('./data/workouts.csv');
    expect(result).toEqual({
        totalWorkouts: 10,
        totalMinutes: 330
    });
});

test('handles missing files', async () => {
    await expect(workoutCalculator('missing.csv')).rejects.toThrow();
});
