import mysql from 'mysql2';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
	if (!pool) {
		pool = mysql.createPool({
			host: 'sleep360.csse.rose-hulman.edu',
			user: 'USERNAME',
			password: 'PASSWORD',
			database: 'sleep360',
			waitForConnections: true,
			connectionLimit: 50,
			queueLimit: 0
		});
	}
	return pool;
}

// Function to create a new account
export async function createAccount(email, name, major) {
	const db = await getDatabase();
	const [result] = await db.query(
		'INSERT INTO accounts (Email, Name, Major) VALUES (?, ?, ?)',
		[email, name, major]
	);
	return result;
}

// Function to create a new report
export async function createReport(timeReported, numHours, numInterrupts, qualitySleep) {
	console.log('This is a message to the console');
	try{
		const db = await getDatabase();
		const [result] = await db.query(
			'INSERT INTO reports (`Time Reported`, `Number Hours`, `Number Interruptions`, `Quality of Sleep`) VALUES (?, ?, ?, ?)',
			[timeReported, numHours, numInterrupts, qualitySleep]
		);
		return result;
	}catch (error) {
        // If an error occurs, log the error details
        console.error('Error occurred while creating the report:', error);

        // Throw the error to be caught by higher-level error handling
        throw new Error('Failed to create the report. Please try again later.');
    }
	
}
