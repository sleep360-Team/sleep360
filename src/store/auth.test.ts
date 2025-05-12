import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

describe('auth store', () => {
	beforeEach(() => {
		localStorage.getItem = vi.fn(() => null);
		localStorage.setItem = vi.fn();
		localStorage.removeItem = vi.fn();
		localStorage.clear = vi.fn();
	});

	it('should initialize with localStorage value', async () => {
		localStorage.getItem = vi.fn(() => 'initial-token');
		vi.resetModules(); // Reset module cache

		const { authToken } = await import('./auth.js');
		expect(get(authToken)).toBe('initial-token');
	});

	it('setAuthToken should update store and localStorage', async () => {
		vi.resetModules();
		const { authToken, setAuthToken } = await import('./auth.js');

		setAuthToken('new-token');
		expect(get(authToken)).toBe('new-token');
		expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'new-token');
	});

	it('clearAuthToken should clear store and localStorage', async () => {
		vi.resetModules();
		const { authToken, setAuthToken, clearAuthToken } = await import('./auth.js');

		setAuthToken('token');
		clearAuthToken();
		expect(get(authToken)).toBe(null);
		expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
	});
});
