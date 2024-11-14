import mysql from 'mysql2/promise';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
	if (!pool) {
		pool = mysql.createPool({
			host: 'sleep360.csse.rose-hulman.edu',
			user: 'USER',
			password: 'PW',
			database: 'sleep360',
			port: 1433,
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
	try{
		const [result] = await db.query(
			'INSERT INTO Accounts (Email, Name, Major) VALUES (?, ?, ?)',
			[email, name, major]
		);
		return result;
	} catch(error){
		console.error('Error occurred while creating the report:', error);
		console.error('Error details:', error.message, error.stack);
	}
	
}

// Function to create a new report
export async function createReport(timeReported, numHours, numInterrupts, qualitySleep) {
	console.log('This is a message to the console');
	try{
		const db = await getDatabase();
		const [result] = await db.query(
			'INSERT INTO Reports (`Time Reported`, `Number Hours`, `Number Interruptions`, `Quality of Sleep`) VALUES (?, ?, ?, ?)',
			[timeReported, numHours, numInterrupts, qualitySleep]
		);
		return result;
	}catch (error) {
        console.error('Error occurred while creating the report:', error);
		console.error('Error details:', error.message, error.stack);
    }
	
}
