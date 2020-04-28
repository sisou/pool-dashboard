import { db } from '../_database';
import Nimiq from '@nimiq/core';

export async function get(req, res, next) {
	const { address } = req.params;

	let nimiqAddress = '';
	try {
		nimiqAddress = Nimiq.Address.fromAny(address);
	} catch(error) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({
			error: {
				code: 400, // Bad Request
				message: error.message,
			},
		}));
		return;
	}

	const [rows] = await db.query('SELECT id FROM user WHERE address = ?', [nimiqAddress.toBase64()]);
	const id = rows.length ? rows[0].id : null;

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		id,
		address: nimiqAddress.toUserFriendlyAddress(),
	}));
}
