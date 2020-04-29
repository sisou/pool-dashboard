import { db } from '../../_database';
import dotenv from 'dotenv'; dotenv.config();

async function getChainHeight() {
	const [rows] = await db.query('SELECT height FROM block ORDER BY height DESC LIMIT 1');
	return rows[0].height;
}

/**
 * @param {number} userId
 * @param {number} chainHeight
 * @param {boolean} includeUnconfirmed
 * @returns {Promise.<number>}
 */
async function getUserBalance(userId, chainHeight, includeUnconfirmed = false) {
	const query = `
		SELECT IFNULL(payin_sum, 0) - IFNULL(payout_sum, 0) AS balance
		FROM (
			(
				SELECT user, SUM(amount) AS payin_sum
				FROM payin p
				INNER JOIN block b ON b.id = p.block
				WHERE p.user = ? AND b.main_chain = true AND b.height <= ?
			) t1
			LEFT JOIN
			(
				SELECT user, SUM(amount) AS payout_sum
				FROM payout
				WHERE user = ?
			) t2
			ON t2.user = t1.user
		)`;
	const queryHeight = includeUnconfirmed ? chainHeight : chainHeight - process.env.POOL_CONFIRMATIONS;
	const queryArgs = [userId, queryHeight, userId];
	const [rows] = await db.query(query, queryArgs);
	if (rows.length === 1) {
		return rows[0].balance;
	}
	return 0;
}

export async function get(req, res, next) {
	const { userId } = req.params;

	const chainHeight = await getChainHeight();

	const [confirmed, unconfirmed] = await Promise.all([
		getUserBalance(userId, chainHeight, false),
		// getUserBalance(userId, chainHeight, true),
	]);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		confirmed,
		unconfirmed,
	}));
}
