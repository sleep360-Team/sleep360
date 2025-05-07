<script>
	import { showModal } from './store.js'; // Import the store
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let form;
	$: isModalVisible = $showModal;
	function closeModalAndRedirect() {
		showModal.set(false); // Close the modal
		goto('/dashboard'); // Redirect to the dashboard
	}

	let creating = false;
	let numberHours = 0; // Default value for numHours
	let numberInterrupts = 0; // Default value for numInterrupts
	let qualitySleep = 3; // Default value for qualitySleep
	let comments = '';
	// Map sleep quality number to a string
	const getSleepQualityString = (/** @type {number} */ value) => {
		switch (value) {
			case 1:
				return 'Worst';
			case 2:
				return 'Poor';
			case 3:
				return 'Average';
			case 4:
				return 'Good';
			case 5:
				return 'Best';
		}
	};

	onMount(() => {
		if (form) {
			enhance(form, async ({ result }) => {
				creating = true;

				if (result.type === 'success') {
					alert('Report created successfully!');
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
	<title>Report</title>
</svelte:head>

<nav class="navbar">
	<div class="logo">Sleep360</div>
	<a href="/dashboard">Dashboard</a>
	<a href="/report">Add Report</a>
	<a href="/reports">Reports</a>
	<a href="/account">Account</a>
</nav>

<div class="centered">
	<h2>Report Information</h2>
	<form method="POST" action="?/create" use:enhance>
		<!-- Number of Hours Slept -->
		<label>
			Number of Hours Slept:
			<input
				type="number"
				name="numberHours"
				bind:value={numberHours}
				min="0"
				max="11"
				step="0.1"
				required
			/>
			<input type="range" name="numberHours" bind:value={numberHours} min="0" max="11" />
		</label>

		<!-- Number of Interruptions -->
		<label>
			Number of Interruptions:
			<input
				type="number"
				name="numberInterrupts"
				bind:value={numberInterrupts}
				min="0"
				max="4"
				required
			/>
			<input type="range" name="numberInterrupts" bind:value={numberInterrupts} min="0" max="4" />
		</label>

		<!-- Quality of Sleep (1-5) -->
		<label>
			Quality of Sleep (1-5):
			<input type="number" name="qualitySleep" bind:value={qualitySleep} min="1" max="5" required />
			<input type="range" name="qualitySleep" bind:value={qualitySleep} min="1" max="5" />
			<span>{getSleepQualityString(qualitySleep)}</span>
			<!-- Display corresponding sleep quality string -->
		</label>

		<textarea
			id="commentBox"
			class="textarea"
			name="comments"
			bind:value={comments}
			placeholder="Write any details you'd like to record here..."
			rows="4"
			cols="50"
		></textarea>

		<button formaction="?/create" disabled={creating}>
			{creating ? 'Saving...' : 'Submit Report'}
		</button>
	</form>
</div>

<!-- Success Modal -->
{#if form?.success}
	<div class="modal">
		<div class="modal-content">
			<h3>Report Successfully Added!</h3>
			<button on:click={closeModalAndRedirect} id="returnBtn">Return</button>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 36%;
		left: 36%;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		display: block;
		z-index: 9999;
	}
	.modal-content {
		background: white;
		padding: 20px;
		width: 400px; /* Set a fixed width */
		max-width: 90%; /* Prevent it from being too large */
		border-radius: 10px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
		text-align: center;
		position: relative;
	}
	.close {
		font-size: 30px;
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
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

	span {
		display: inline-block;
		margin-top: 0.5rem;
		font-weight: bold;
		color: #800000;
	}
</style>
