import mysql from 'mysql2';

export const db = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_DATABASE || 'pool',
	user: process.env.DB_USER || 'pool_info',
	password: process.env.DB_PASSWORD || '',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
}).promise();
