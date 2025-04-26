import sql from 'mssql';
import 'dotenv/config';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
	if (!pool) {
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
		const newID = result.output.id;
		return newID;
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
	try {
		const result = await db
			.request()
			.input('TimeReported', sql.DateTime, timeReported)
			.input('NumberHours', sql.Float, numHours)
			.input('NumberInterrupts', sql.Int, numInterrupts)
			.input('QualitySleep', sql.NVarChar, qualitySleep)
			.input('Comments', sql.NVarChar, comments)
			.input('followRec', sql.Bit, followRec)
			.input('UserID', sql.Int, userid)
			.execute('CreateReport');

		return result;
	} catch (error) {
		console.error('Error occurred while creating the report:', error);
		console.error('Error details:', error.message, error.stack);
	}
}
