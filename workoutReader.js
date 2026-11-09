
const fs = require('fs');
const csv = require('csv-parser');

function workoutCalculator(filePath) {
    return new Promise((resolve, reject) => {
        const workouts = [];

        fs.createReadStream(filePath)
            .on('error', reject)
            .pipe(csv())
            .on('data', row => workouts.push(row))
            .on('error', reject)
            .on('end', () => {
                let totalMinutes = 0;

                for (let i = 0; i < workouts.length; i++) {
                    const minutes = Number(workouts[i].duration);

                    if (!Number.isFinite(minutes) ||
                        workouts[i].duration?.trim() === '') {
                        reject(new Error('Invalid workout minutes'));
                        return;
                    }

                    totalMinutes += minutes;
                }

                resolve({
                    totalWorkouts: workouts.length,
                    totalMinutes: totalMinutes
                });
            });
    });
}

module.exports = { workoutCalculator };
