import { vi } from 'vitest';

global.localStorage = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn()
} as any;

vi.mock('mssql', () => {
	return {
		default: {
			connect: vi.fn().mockResolvedValue({
				request: vi.fn().mockReturnThis(),
				input: vi.fn().mockReturnThis(),
				output: vi.fn().mockReturnThis(),
				execute: vi.fn().mockResolvedValue({
					output: { ReportMeetsCriteria: true, ReportExists: true },
					recordset: [{ UserID: 1, HashedPassword: 'hashed_pass' }],
					returnValue: 0
				})
			}),
			Int: 'Int',
			NVarChar: 'NVarChar',
			Float: 'Float',
			DateTime: 'DateTime',
			Bit: 'Bit'
		}
	};
});
