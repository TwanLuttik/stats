require('dotenv').config({
	path: `./.env${process.env.NODE_ENV === 'production' ? '.prod' : ''}`,
});

export const env = {
	// Coatcheck prod database
	PRODUCTION_PG_HOST: process.env.PRODUCTION_PG_HOST,
	PRODUCTION_PG_PORT: process.env.PRODUCTION_PG_PORT,
	PRODUCTION_PG_USER: process.env.PRODUCTION_PG_USER,
	PRODUCTION_PG_PASS: process.env.PRODUCTION_PG_PASS,
	PRODUCTION_PG_DATABASE: process.env.PRODUCTION_PG_DATABASE,

	// Local server for time series
	LOCAL_PG_HOST: process.env.LOCAL_PG_HOST,
	LOCAL_PG_PORT: process.env.LOCAL_PG_PORT,
	LOCAL_PG_USER: process.env.LOCAL_PG_USER,
	LOCAL_PG_PASS: process.env.LOCAL_PG_PASS,
	LOCAL_PG_DATABASE: process.env.LOCAL_PG_DATABASE,

	IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
