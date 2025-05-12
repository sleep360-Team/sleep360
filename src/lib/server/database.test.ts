// tests/db.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import * as dbModule from './database.js';

beforeEach(() => {
	process.env.DB_USER = 'test_user';
	process.env.DB_PASS = 'test_pass';
	process.env.DB_URL = 'localhost';
	process.env.DB_NAME = 'test_db';
});

describe('Database Functions', () => {
	it('should connect to the database only once', async () => {
		const pool1 = await dbModule.getDatabase();
		const pool2 = await dbModule.getDatabase();
		expect(pool1).toBe(pool2);
	});

	it('should check account reports and return true', async () => {
		const result = await dbModule.checkAccountReports(123);
		expect(result).toBe(true);
	});

	it('should return hashed password', async () => {
		const hash = await dbModule.getUserHashedPassword(1);
		expect(hash).toBe('hashed_pass');
	});
});