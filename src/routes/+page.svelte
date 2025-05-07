<script>
	import { enhance } from '$app/forms';
	import { showModal } from './account/store.js'; // Import the store
	import { goto } from '$app/navigation';
	$: isModalVisible = $showModal;
	function closeModalAndRedirect() {
		showModal.set(false); // Close the modal
		goto('./'); // Redirect to the home page
	}
	export let form;

	let creating = false;

	let username = '';
</script>

<svelte:head>
	<title>Sleep360</title>
</svelte:head>

<nav class="navbar navbar-dark"></nav>

<div class="centered">
	<h1>Welcome</h1>
	<br />

	<form method="POST" action="?/create">
		<label>
			Username:
			<input type="username" name="username" autocomplete="off" required />
		</label>

		<label>
			Password:
			<input type="password" name="password" autocomplete="off" required />
		</label>
		<button formaction="?/login" type="submit" disabled={creating}>
			{creating ? 'Saving...' : 'Log In'}
		</button>
		<button formaction="?/create" type="submit" disabled={creating}>
			{creating ? 'Saving...' : 'Sign Up'}
		</button>
	</form>
	<!-- Success Modal -->
	{#if form?.success}
		<div class="modal">
			<div class="modal-content">
				<h3>Account Successfully Created!</h3>
				<button on:click={closeModalAndRedirect} id="returnBtn">Close</button>
			</div>
		</div>
	{/if}

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
</div>

<style>
	.navbar {
		background-color: #800000;
		color: white;
	}
	.navbar a {
		color: white; /* Change link color to white */
		text-decoration: none; /* Remove underline */
	}
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		display: block;
		margin-top: 1rem;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.5rem;
	}
	button {
		margin-top: 1rem;
		padding: 0.5rem;
		background-color: #800000;
		color: white;
		border: none;
		cursor: pointer;
	}

	button[disabled] {
		background-color: #ccc;
	}
</style>
