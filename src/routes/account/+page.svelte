<nav class="navbar">
	<div class="logo">
        Sleep360
      </div>
	<a href="/account">Account</a>
	<a href="/report">Add Report</a>
	<a href="/Reports">Reports</a>
    <a href="/dashboard">Dashboard</a>
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
		method="POST" action="?/update"
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

		<button type="submit" disabled={creating}>Update Account</button>
		{#if creating}
			<span class="saving">saving...</span>
		{/if}
		
	</form>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
	<form method="POST" action="?/delete">
	<button disabled={creating}>Delete Account</button> </form>
		{#if creating}
			<span class="deleting">deleting...</span>
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
	

    button[disabled] {
        background-color: #ccc;
    }

</style>
