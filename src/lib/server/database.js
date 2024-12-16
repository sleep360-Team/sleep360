import sql from 'mssql';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
    if (!pool) {
        pool = await sql.connect({
            user: 'brookse1',
            password: 'Waterbender2002',
            server: 'sleep360.csse.rose-hulman.edu',
            database: 'sleep360',
            port: 1433, 
            options: {
                encrypt: true, 
                trustServerCertificate: true, 
            },
            connectionTimeout: 10000,  
            requestTimeout: 30000, 
        });
    }
    return pool;
}

export async function readReports(userId) {
    const db = await getDatabase();
    try {
      const result = await db.request()
        .input('UserID', sql.Int, userId) 
        .execute('ReadReports');  
      return result.recordset; 
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch reports.');
    }
}

export async function createAccount(username, hash) {
    const db = await getDatabase();
    try {
        const result = await db.request()
			.input('incomingUsername', sql.NVarChar(50), username)
            .input('incomingHash', sql.NVarChar(64), hash)
            .execute('Register');
        return result;
    } catch (error) {
        console.error('Error occurred while creating the account:', error);
        console.error('Error details:', error.message, error.stack);
    }
}

// Function to update a new account
export async function updateAccount(email, name, major, username) {
    const db = await getDatabase();
    try {
        const result = await db.request()
            .input('Email', sql.NVarChar, email)  
            .input('Name', sql.NVarChar, name)
            .input('Major', sql.NVarChar, major)
			.input('Username', sql.NVarChar, username)
            .execute('UpdateAccount');
        return result;
    } catch (error) {
        console.error('Error occurred while creating the account:', error);
        console.error('Error details:', error.message, error.stack);
    }
}

// Function to create a new report
export async function createReport(timeReported, numHours, numInterrupts, qualitySleep) {
    console.log('This is a message to the console');
    const db = await getDatabase();
    try {
        const result = await db.request()
            .input('TimeReported', sql.DateTime, timeReported) 
            .input('NumberHours', sql.Int, numHours)
            .input('NumberInterrupts', sql.Int, numInterrupts)
            .input('QualitySleep', sql.NVarChar, qualitySleep)
            .execute('CreateReport');

        return result;
    } catch (error) {
        console.error('Error occurred while creating the report:', error);
        console.error('Error details:', error.message, error.stack);
    }
}
