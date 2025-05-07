<script>
	import { showModal } from './store.js';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let form;
	export let data;
	const showExtraLabel = data.showExtraLabel;
	console.log('show: ' + showExtraLabel);
	$: isModalVisible = $showModal;
	function closeModalAndRedirect() {
		showModal.set(false);
		goto('/dashboard');
	}

	let creating = false;
	let numberHours = 0;
	let numberInterrupts = 0;
	let qualitySleep = 3;
	let comments = '';
	let followRec = '0';

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
	<a href="/recommendations">Recommendations</a>
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
				max="18"
				step="0.1"
				required
			/>
			<input type="range" name="numberHours" bind:value={numberHours} min="0" max="18" />
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

		{#if showExtraLabel}
			<label>
				Did you follow your sleep recommedation?
				<select name="extraLabel" bind:value={followRec} required>
					<option value="1">Yes</option>
					<option value="0">No</option>
				</select>
			</label>
		{/if}

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
	.centered {
		max-width: 20em;
		margin: 0 auto;
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
