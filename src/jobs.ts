import { extractDailyMetrics } from 'job.controller';
import cron from 'node-cron';
import { green } from 'colors';

console.log(green('SERVER: Jobs registered'));
cron.schedule(
	`0 0 * * *`,
	() => {
		extractDailyMetrics();
	},
	{
		timezone: 'America/New_York',
	}
);
