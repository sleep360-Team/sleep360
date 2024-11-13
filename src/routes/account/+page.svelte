<nav class="navbar navbar-dark fixed-top">
	<a href="/">Home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
</nav>

<script>
	import { enhance } from '$app/forms';
	export let form;

	let creating = false;

	let email = '';
	let name = '';
	let major = '';

</script>

<div class="centered">
	<h1>User Information</h1>

	<form
		method="POST" action="?/create"
	>
	<label>
		Email:
		<input
		   type="email"
		   name="email"
		   autocomplete="off"
		   required
		/>
	 </label>
	 
	 <label>
		Name:
		<input
		   type="text"
		   name="name"
		   autocomplete="off"
		   required
		/>
	 </label>
	 
	 <label>
		Major:
		<input
		   type="text"
		   name="major"
		   autocomplete="off"
		   required
		/>
	 </label>
	 

		<button type="submit" disabled={creating}>Submit</button>
		{#if creating}
			<span class="saving">saving...</span>
		{/if}
	</form>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
</div>

<style>
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
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    button[disabled] {
        background-color: #ccc;
    }

</style>
