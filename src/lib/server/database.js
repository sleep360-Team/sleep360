import sql from 'mssql';

let pool;

// Initialize the database connection pool
export async function getDatabase() {
    if (!pool) {
        pool = await sql.connect({
            user: 'UN',
            password: 'PW',
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

// Function to create a new account
export async function createAccount(email, name, major) {
    const db = await getDatabase();
    try {
        const result = await db.request()
            .input('Email', sql.NVarChar, email)  
            .input('Name', sql.NVarChar, name)
            .input('Major', sql.NVarChar, major)
            .query('INSERT INTO Accounts (Email, Name, Major) VALUES (@Email, @Name, @Major)');

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
            .query('INSERT INTO Reports ([Time Reported], [Number Hours], [Number Interruptions], [Quality of Sleep]) VALUES (@TimeReported, @NumberHours, @NumberInterrupts, @QualitySleep)');

        return result;
    } catch (error) {
        console.error('Error occurred while creating the report:', error);
        console.error('Error details:', error.message, error.stack);
    }
}
