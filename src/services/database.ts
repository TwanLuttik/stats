import PG from 'pg';
import fs from 'node:fs';
import { env } from '@internal/server';

export const ProductionPGClient = new PG.Pool({
	host: env.PRODUCTION_PG_HOST,
	database: env.PRODUCTION_PG_DATABASE,
	user: env.PRODUCTION_PG_USER,
	password: env.PRODUCTION_PG_PASS,
	port: 5432,
	// options: `project=${env.DB_ENDPOINT_ID}`,
	// This is needed since pg version 8.0 has this enalbed by default
	...(env.IS_PRODUCTION && {
		ssl: {
			ca: fs.readFileSync('./us-west-2-bundle.pem').toString(),
		},
	}),
});

export const LocalPGClient = new PG.Pool({
	host: env.LOCAL_PG_HOST,
	database: env.LOCAL_PG_DATABASE,
	user: env.LOCAL_PG_USER,
	password: env.LOCAL_PG_PASS,
	port: 5432,
});
