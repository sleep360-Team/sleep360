//FAKE DB STARTS HERE
const db = new Map();

export function getTodos(userid) {
	if (!db.get(userid)) {
		db.set(userid, [{
			id: crypto.randomUUID(),
			description: 'Learn SvelteKit',
			done: false
		}]);
	}

	return db.get(userid);
}

export function createTodo(userid, description) {
	if (description === '') {
		throw new Error('todo must have a description');
	}

	const todos = db.get(userid);

	if (todos.find((todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export function deleteTodo(userid, todoid) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}
//FAKE DB ENDS HERE

import mysql from 'mysql2';

// Create a connection
const connection = mysql.createConnection({
    host: 'sleep360.csse.rose-hulman.edu',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'sleep360'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Example query
connection.query('SELECT * from Reports', (err, results) => {
    if (err) throw err;
    console.log(results);
});

// Close the connection
connection.end();
