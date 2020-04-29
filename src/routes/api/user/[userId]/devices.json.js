import { db } from '../../_database';
import { calculateHashrate } from '../../_helpers';

export async function get(req, res, next) {
	const { userId } = req.params;

	const [rows] = await db.query(
		'SELECT device, SUM(difficulty) AS difficulty, UNIX_TIMESTAMP() - MIN(block.datetime) AS duration, MAX(block.height) AS last_prev_block FROM shares LEFT JOIN block ON prev_block = block.id WHERE shares.user = ? GROUP BY shares.device',
		[userId],
	);

	const devices = rows.map(row => ({
		id: row.device,
		hashrate: calculateHashrate(row.difficulty, row.duration),
		last_block: row.last_prev_block + 1,
	}));

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(devices));
}
