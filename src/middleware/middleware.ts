import { catchResponseHandler, customResponse } from '@internal/logic';
import { IRoutePermission, RouteArgs } from '@internal/server';

export const permissionsHandler = async ({ req, res }: RouteArgs, permission: IRoutePermission): Promise<any> => {
	try {
		// return if no perm needed for the route
		if (!permission) return;

		// session handler
		await authHandler({ req, res });
	} catch (error) {
		return catchResponseHandler(res, error);
	}
};

const authHandler = async ({ req, res }: RouteArgs): Promise<boolean> => {
	try {
		// handle auth logic
		if (req.headers['auth_token'] === 'fnjdo2fo5hcwp5248onf') {
			return;
		} else {
			return customResponse(res, { error: 'no auth' });
		}
	} catch (error) {
		catchResponseHandler(res, error);
	}
};
