<nav class="navbar navbar-dark fixed-top">
	<a href="/">home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
</nav>

<h1>Welcome</h1>
<p>this is the Account page</p>

<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let creating = false;
	/**
	 * @type {any[]}
	 */
	let deleting = [];
	let email = '';
	let name = '';
	let major = '';

</script>

<div class="centered">
	<h1>User Information</h1>

	<form
		method="POST"
		action="?/create"  
		use:enhance={() => {
			creating = true;
			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	>
		<label>
			Email:
		</label>
		<input
			type="email"
			bind:value={email}
			autocomplete="off"
			required
		/>

		<label>
			Name:
		</label>
		<input
			type="text"
			bind:value={name}
			autocomplete="off"
			required
		/>

		<label>
			Major:
		</label>
		<input
			type="text"
			bind:value={major}
			autocomplete="off"
			required
		/>

		<button type="submit" disabled={creating}>Submit</button>
		{#if creating}
			<span class="saving">saving...</span>
		{/if}
	</form>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if creating}
		<span class="saving">saving...</span>
	{/if}
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		display: block; /* Makes label take full line */
		margin-top: 1rem; /* Adds space above labels */
	}

	input {
		width: 100%; /* Makes input fields full width */
		padding: 0.5rem; /* Adds padding for better appearance */
		margin-top: 0.5rem; /* Adds space between input and label */
	}
</style>
