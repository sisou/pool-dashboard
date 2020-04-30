import dotenv from 'dotenv'; dotenv.config();

export function get(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		name: process.env.POOL_NAME,
		tagline: process.env.POOL_TAGLINE,
		domain: process.env.POOL_DOMAIN,
		port: process.env.POOL_PORT,
		nim_address: process.env.POOL_NIM_ADDRESS,
		fee: process.env.POOL_FEE,
		confirmations: process.env.POOL_CONFIRMATIONS,
		payout_frequency: process.env.POOL_PAYOUT_FREQUENCY,
	}));
}
