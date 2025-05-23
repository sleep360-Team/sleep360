import sql from 'mssql';
import 'dotenv/config';
import { error } from '@sveltejs/kit';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
	if (!pool) {
		if (!process.env.DB_USER) {
			throw new Error(
				'environment variable for DB_USER is not initialized, check the .env file (does it exist?)'
			);
		}
		if (!process.env.DB_PASS) {
			throw new Error(
				'environment variable for DB_PASS is not initialized, check the .env file (does it exist?)'
			);
		}
		if (!process.env.DB_URL) {
			throw new Error(
				'environment variable for DB_URL is not initialized, check the .env file (does it exist?)'
			);
		}
		if (!process.env.DB_NAME) {
			throw new Error(
				'environment variable for DB_NAME is not initialized, check the .env file (does it exist?)'
			);
		}
		pool = await sql.connect({
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			server: process.env.DB_URL,
			database: process.env.DB_NAME,
			port: 1433,
			options: {
				encrypt: true,
				trustServerCertificate: true
			},
			connectionTimeout: 10000,
			requestTimeout: 30000
		});
	}
	return pool;
}

export async function checkAccountReports(accountId) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('AccountID', sql.Int, accountId)
			.output('ReportMeetsCriteria', sql.Bit) // for true/false return
			.execute('CheckAccountReports');
		const meetsCriteria = result.output.ReportMeetsCriteria;
		return meetsCriteria; // true (1) or false (0)
	} catch (error) {
		console.error('Error occurred while checking account reports:', error);
		console.error('Error details:', error.message, error.stack);
	}
	return false; // Default to false if there's an error
}

export async function getRecommendations() {
	const db = await getDatabase();
	try {
		const result = await db.request().execute('GetRandomRecommendations');
		return result.recordset;
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch reports.');
	}
}

export async function readReports(userId) {
	const db = await getDatabase();
	try {
		const result = await db.request().input('UserID', sql.Int, userId).execute('ReadReports');
		const res1 = await result;
		return res1;
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch reports.');
	}
}

export async function readReportsDashboard(userId) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('UserID', sql.Int, userId)
			.execute('ReadReportsDashboard');
		const res2 = await result;
		return res2;
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch reports.');
	}
}

export async function getUserID(username) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('Username', sql.NVarChar(50), String(username).trim())
			.execute('GetUserIDByUsername');
		const userID = result.recordset[0]?.UserID;
		return userID;
	} catch (error) {
		console.error('Error occurred while retrieving user ID:', error);
		console.error('Error details:', error.message, error.stack);
	}

	return result.recordset[0]?.UserID;
}

export async function checkIfReportExistsToday(userid) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('UserID', sql.Int, userid)
			.output('ReportExists', sql.Bit)
			.execute('CheckIfReportExistsToday');
		const reportExists = result.output.ReportExists;
		return reportExists;
	} catch (error) {
		console.error('Error occurred while retrieving user ID:', error);
		console.error('Error details:', error.message, error.stack);
	}
	return -1;
}

export async function getUserHashedPassword(userid) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('UserID', sql.Int, userid)
			.execute('GetUserHashedPassword');
		const hashedpassword = result.recordset[0]?.HashedPassword;
		return hashedpassword;
	} catch (error) {
		console.error('Error occurred while retrieving user hashed password:', error);
		console.error('Error details:', error.message, error.stack);
	}
	return null;
}

export async function createAccount(username, hash, id) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('incomingUsername', sql.NVarChar(50), username)
			.input('incomingHash', sql.NVarChar(64), hash)
			.output('id', sql.Int, id)
			.execute('Register');
		const returnCode = result.returnValue;
		const userId = result.output.id;

		let success = returnCode === 0;
		let message;

		switch (returnCode) {
			case 0:
				message = 'Account created successfully.';
				break;
			case -1:
				message = 'Username cannot be null or empty.';
				break;
			case -2:
				message = 'Password cannot be null or empty.';
				break;
			case -3:
				message = 'This username already exists.';
				break;
			default:
				message = 'An unknown error occurred.';
		}

		return { success, message, userId };
	} catch (error) {
		console.error('Error occurred while creating the account:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

// Function to update a new account
export async function updateAccount(email, name, major, username) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('Email', sql.NVarChar, email)
			.input('Name', sql.NVarChar, name)
			.input('Major', sql.NVarChar, major)
			.input('Username', sql.NVarChar, username)
			.execute('UpdateAccount');
		return result;
	} catch (error) {
		console.error('Error occurred while updating the account:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

export async function deleteAccount(userid) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('UserID', sql.Int, userid)
			.execute('DeleteAccountByUserID');
		return result;
	} catch (error) {
		console.error('Error occurred while deleting the account:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

// Function to create a new report
export async function createReport(
	timeReported,
	numHours,
	numInterrupts,
	qualitySleep,
	comments,
	followRec,
	userid
) {
	console.log('This is a message to the console');
	const db = await getDatabase();
	const realFollowRec = followRec == 1;
	try {
		const result = await db
			.request()
			.input('TimeReported', sql.DateTime, timeReported)
			.input('NumberHours', sql.Float, numHours)
			.input('NumberInterrupts', sql.Int, numInterrupts)
			.input('QualitySleep', sql.NVarChar, qualitySleep)
			.input('Comments', sql.NVarChar, comments)
			.input('followRec', sql.Bit, realFollowRec)
			.input('UserID', sql.Int, userid)
			.execute('CreateReport');

		return result;
	} catch (error) {
		console.error('Error occurred while creating the report:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

export async function deleteReports(reportid) {
	const db = await getDatabase();
	try {
		const result = await db.request().input('ReportID', sql.Int, reportid).execute('DeleteReport');
		return result;
	} catch (error) {
		console.error('Error occurred while deleting the report:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

export async function addRecToAcc(userid, recid) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('RecommendationID', sql.Int, recid)
			.input('AccountID', sql.Int, userid)
			.execute('AddUserRecommendationToAccount');
		return result;
	} catch (error) {
		console.error('Error occurred while adding recommendation:', error);
		console.error('Error details:', error.message, error.stack);
	}
}

export async function getCurrentRec(userid) {
	const db = await getDatabase();
	try {
		const result = await db
			.request()
			.input('UserID', sql.Int, userid)
			.execute('GetCurrentRecommendation');
		return result;
	} catch (error) {
		console.error('Error occurred while getting recommendation:', error);
		console.error('Error details:', error.message, error.stack);
	}
}
