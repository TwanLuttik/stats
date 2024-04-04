import { IRoute } from '@internal/server';
import { stats } from './index';

export const GlobalServerRoutes = [
	// A non authenticated route
	{ method: 'POST', path: '/stats/today/update', handler: stats.updateDailyMetrics, auth: 'USER' },
	// Authenticated route with the type USER, (in middleware.ts you can configure you auth logic)
	// { method: 'GET', path: '/ping', handler: ping.ping, auth: 'USER },
] as IRoute[];
