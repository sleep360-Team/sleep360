// src/stores/auth.js
import { writable } from 'svelte/store';

export const authToken = writable(localStorage.getItem('auth_token'));

// Function to set the JWT in the store and localStorage
/**
 * @param {string} token
 */
export function setAuthToken(token) {
	authToken.set(token);
	localStorage.setItem('auth_token', token);
}

// Function to clear the JWT from the store and localStorage
export function clearAuthToken() {
	authToken.set(null);
	localStorage.removeItem('auth_token');
}
