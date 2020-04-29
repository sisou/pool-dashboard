import { db } from '../../_database';
import { calculateHashrate } from '../../_helpers';

async function getChainHeight() {
	const [rows] = await db.query('SELECT height FROM block ORDER BY height DESC LIMIT 1');
	return rows[0].height;
}

async function getDevices(userId) {
	const [rows] = await db.query(
		'SELECT device, SUM(difficulty) AS difficulty, UNIX_TIMESTAMP() - MIN(block.datetime) AS duration, MAX(block.height) AS last_prev_block FROM shares LEFT JOIN block ON prev_block = block.id WHERE shares.user = ? GROUP BY shares.device',
		[userId],
	);
	return rows;
}

export async function get(req, res, next) {
	const { userId } = req.params;

	const [chainHeight, deviceRows] = await Promise.all([
		getChainHeight(),
		getDevices(userId),
	]);

	const devices = deviceRows.map(row => ({
		id: row.device,
		hashrate: calculateHashrate(row.difficulty, row.duration),
		last_block: row.last_prev_block + 1,
		chain_height: chainHeight,
	}));

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(devices));
}
