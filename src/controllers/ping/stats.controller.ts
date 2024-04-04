import { customResponse } from '@internal/logic';
import { RouteArgs } from '@internal/server';
import { extractDailyMetrics } from 'job.controller';

export const updateDailyMetrics = async ({ req, res }: RouteArgs): Promise<any> => {
	await extractDailyMetrics();
	return customResponse(res, { success: 'done' });
};
