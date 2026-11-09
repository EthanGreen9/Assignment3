
const { healthMetricsCounter } = require('../healthReader');

test('counts health entries', async () => {
    const result = await healthMetricsCounter('./data/health-metrics.json');
    expect(result).toEqual({ totalHealthEntries: 8 });
});

test('handles missing files', async () => {
    await expect(healthMetricsCounter('missing.json')).rejects.toThrow();
});
