import type { Pool, ResultSetHeader } from 'mysql2/promise';

// Define types for your data models
export interface Account {
	email: string;
	name: string;
	major: string;
}

export interface Report {
	timeReported: string;  
	numHours: number;      
	numInterrupts: number; 
	qualitySleep: string;  
}

declare module '$lib/server/database.js' {
	export function getDatabase(): Promise<Pool>;

	export function getUserID(
		username: string
	): Promise<ResultSetHeader>;

	export function getUserHashedPassword(
		userid: int
	): Promise<ResultSetHeader>;

	export function createAccount(
		username: string,
		hash: string
	): Promise<ResultSetHeader>;

	export function updateAccount(
		email: string,
		name: string,
		major: string,
		username: string
	): Promise<ResultSetHeader>;

	export function createReport(
		timeReported: string,   
		numHours: number,      
		numInterrupts: number, 
		qualitySleep: string  
	): Promise<ResultSetHeader>;
}
