<nav class="navbar navbar-dark fixed-top">
	<a href="/">home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
</nav>

<h1>Welcome</h1>
<p>this is the Report page</p>

<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let data;
	export let form;
	let a = 1;
	let creating = false;
	/**
	 * @type {any[]}
	 */
	let deleting = [];
	
</script>
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<p>Your Goal: {9 - a} hours of sleep away!</p>


<style>
	body {
    background: #DDDDDD;
}

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
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}
/* 
	.saving {
		opacity: 0.5;
	}
	.deleting {
				opacity: 0.5;
			} */
</style>