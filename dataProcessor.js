
require('dotenv').config();

const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
    try {
        const name = process.env.USER_NAME;
        const goal = Number(process.env.WEEKLY_GOAL);

        console.log('Processing data for: ' + name);

        const workouts = await workoutCalculator('./data/workouts.csv');
        const health = await healthMetricsCounter('./data/health-metrics.json');

        console.log('\n=== SUMMARY ===');
        console.log('Workouts found: ' + workouts.totalWorkouts);
        console.log('Total workout minutes: ' + workouts.totalMinutes);
        console.log('Health entries found: ' + health.totalHealthEntries);
        console.log('Weekly goal: ' + goal + ' minutes');

        if (workouts.totalMinutes >= goal) {
            console.log('Congratulations ' + name + '! Goal met!');
        } else {
            console.log('Keep going! You have not met your goal yet.');
        }
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

processFiles();
