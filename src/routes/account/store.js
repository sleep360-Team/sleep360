import { writable } from 'svelte/store';
// Store to manage the modal visibility
export const showModal = writable(false);
export const modalMessage = writable('');
export const registrationError = writable('');
