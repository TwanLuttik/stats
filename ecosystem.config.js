module.exports = {
	apps: [
		{
			name: 'server',
			script: 'pnpm',
			args: 'dev',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
