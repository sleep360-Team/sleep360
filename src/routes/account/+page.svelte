<script>
	import { showModal } from './store.js'; // Import the store
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let form;

	let creating = false;

	let email = '';
	let name = '';
	let major = '';
	$: isModalVisible = $showModal;
	function closeModalAndRedirect() {
		showModal.set(false); // Close the modal
		goto('/dashboard'); // Redirect to the dashboard
	}
	onMount(() => {
		if (form) {
			enhance(form, async ({ result }) => {
				creating = true;

				if (result.type === 'success') {
					showModal.set(true); // If you want to show a modal
				} else {
					alert(result.data?.error || 'Failed to create report.');
				}

				creating = false;
			});
		}
	});
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>

<nav class="navbar">
	<div class="logo">Sleep360</div>
	<a href="/dashboard">Dashboard</a>
	<a href="/report">Add Report</a>
	<a href="/reports">Reports</a>
	<a href="/account">Account</a>
</nav>

<div class="centered">
	<h1>User Information</h1>

	<form method="POST" action="?/update" use:enhance>
		<label>
			Email:
			<input type="email" name="email" autocomplete="off" required />
		</label>

		<label>
			Name:
			<input type="text" name="name" autocomplete="off" required />
		</label>

		<label>
			Major:
			<input type="text" name="major" autocomplete="off" required />
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
		<button disabled={creating}>Delete Account</button>
	</form>
	{#if creating}
		<span class="deleting">deleting...</span>
	{/if}
</div>
<!-- Success Modal -->
{#if form?.success}
	<div class="modal">
		<div class="modal-content">
			<h3>Account Successfully Updated!</h3>
			<button on:click={closeModalAndRedirect} id="returnBtn">Return</button>
		</div>
	</div>
{/if}

<style>
    button[disabled] {
        background-color: #ccc;
    }

</style>
