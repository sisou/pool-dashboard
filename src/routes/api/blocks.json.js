import { db } from './_database';
import Nimiq from '@nimiq/core';

async function getChainHeight() {
	const [rows] = await db.query('SELECT height FROM block ORDER BY height DESC LIMIT 1');
	return rows[0].height;
}

async function getPoolBlocks() {
	const [rows] = await db.query(
		'SELECT DISTINCT payin.block AS id, hash, height, datetime, main_chain FROM payin LEFT JOIN block ON payin.block = block.id ORDER BY height DESC LIMIT 10;',
	);
	return rows;
}

export async function get(req, res, next) {
	const [chainHeight, blockRows] = await Promise.all([
		getChainHeight(),
		getPoolBlocks(),
	]);

	const blocks = blockRows.map(block => ({
		height: block.height,
		timestamp: block.datetime,
		hash: Nimiq.BufferUtils.toHex(block.hash),
		main_chain: block.main_chain,
		confirmations_remaining: Math.max(0, process.env.POOL_CONFIRMATIONS - (chainHeight - block.height)),
	}));

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(blocks));
}
