import { db } from '../_database';
import Nimiq from '@nimiq/core';

async function getUserId(base64Address) {
	const [rows] = await db.query('SELECT id FROM user WHERE address = ?', [base64Address]);
	return rows.length ? rows[0].id : null;
}

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

	const id = await getUserId(nimiqAddress.toBase64());

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
		id,
		address: nimiqAddress.toUserFriendlyAddress(),
	}));
}
