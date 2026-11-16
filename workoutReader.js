const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filepath)
            .on('error', (error) => {
                reject(error);
            })
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function workoutCalculator(filepath) {
    try {
        const workouts = await readWorkoutData(filepath);
        let totalWorkouts = workouts.length;
        let totalMinutes = 0;

        for (let i = 0; i < workouts.length; i++) {
            totalMinutes += parseFloat(workouts[i].duration);
        }

        return { totalWorkouts, totalMinutes };

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('CSV file not found');
        } else {
            console.log('Error processing CSV file:', error.message);
        }
        return null;
    }
}

module.exports = { workoutCalculator };
