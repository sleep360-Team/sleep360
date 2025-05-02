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
	followRec: boolean;
}

type Recommendation = {
	RecommendationID: number;
	Description: string;
  };
  
  type RecommendationsResult = {
	recordset: Recommendation[];
  };
  
  type CreateAccountResult = {
	success: boolean;
	message: string;
	userId?: number; // optional, only present when success === true
  };

declare module '$lib/server/database.js' {
	export function getDatabase(): Promise<Pool>;
	
	export function getRecommendations(
	): Promise<ResultSetHeader>;

	export function getUserID(
		username: string
	): Promise<ResultSetHeader>;

	export function getUserHashedPassword(
		userid: int
	): Promise<ResultSetHeader>;

	export function createAccount(
		username: string,
		hash: string,
		id: int
	): Promise<CreateAccountResult>;

	export function updateAccount(
		email: string,
		name: string,
		major: string,
		username: string
	): Promise<ResultSetHeader>;

	export function deleteAccount(
		userid: int
	): Promise<ResultSetHeader>;

	export function createReport(
		timeReported: string,   
		numHours: float,      
		numInterrupts: number, 
		qualitySleep: string,
		comments: string,
		followRec: boolean,
		userid: int  
	): Promise<ResultSetHeader>;

	export function readReportsDashboard(
		userid: int
	): Promise<ResultSetHeader>;

	export function readReports(
		userid: int
	): Promise<ResultSetHeader>;

	export function deleteReports(
		reportid: int
	): Promise<ResultSetHeader>;

	
	export function addRecToAcc(
		recid: int,
		id: int
	): Promise<ResultSetHead>;
}
