import { customResponse } from '@internal/logic';
import { RouteArgs } from '@internal/server';
import { db } from 'services';

export const ping = async ({ req, res }: RouteArgs): Promise<any> => {
	const x = await db.selectOne(``);
	return customResponse(res, { success: 'pong' });
};
