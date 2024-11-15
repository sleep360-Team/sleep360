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

	export function createAccount(
		email: string,
		name: string,
		major: string
	): Promise<ResultSetHeader>;

	export function createReport(
		timeReported: string,   
		numHours: number,      
		numInterrupts: number, 
		qualitySleep: string  
	): Promise<ResultSetHeader>;
}
