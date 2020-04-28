import { db } from '../_database';
import Nimiq from '@nimiq/core';

export async function get(req, res, next) {
	const { address } = req.params;

	const nimiqAddress = Nimiq.Address.fromAny(address);

	const [rows] = await db.query('SELECT id FROM user WHERE address = ?', [nimiqAddress.toBase64()]);
	const id = rows.length ? rows[0].id : null;

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		id,
		address: nimiqAddress.toUserFriendlyAddress(),
	}));
}
