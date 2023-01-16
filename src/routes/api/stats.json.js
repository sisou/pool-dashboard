import { db } from './_database';
import { calculateHashrate } from './_helpers';

async function getPoolStats() {
	const [rows] = await db.query(
		'SELECT COUNT(DISTINCT device) AS device_count, COUNT(DISTINCT user) AS user_count, SUM(difficulty) AS difficulty, UNIX_TIMESTAMP() - MIN(block.datetime) AS duration FROM shares LEFT JOIN block ON prev_block = block.id',
	);
	return rows[0];
}

// async function getPoolBlockCount() {
// 	const timestamp24hoursAgo = Math.floor(Date.now() / 1e3 - 24 * 60 * 60);
// 	const [block24hoursAgo] = await db.query('SELECT height FROM block WHERE datetime >= 1673786613 LIMIT 1');
// 	const height = block24hoursAgo.height;

// 	const [rows] = await db.query(
// 		'SELECT COUNT(DISTINCT payin.block) AS block_count FROM payin INNER JOIN block ON block.id = payin.block WHERE block.main_chain = 1',
// 	);
// 	return rows[0].block_count;
// }

export async function get(req, res, next) {
	const [stats, block_count] = await Promise.all([
		getPoolStats(),
		// getPoolBlockCount(),
	]);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		device_count: stats.device_count,
		user_count: stats.user_count,
		hashrate: calculateHashrate(stats.difficulty, stats.duration),
		// block_count,
	}));
}
