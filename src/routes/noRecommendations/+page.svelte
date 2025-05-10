<svelte:head>
	<title>Recommendations Unavailable</title>
</svelte:head>

<nav class="navbar">
	<div class="logo">Sleep360</div>
	<a href="/dashboard">Dashboard</a>
	<a href="/report">Add Report</a>
	<a href="/reports">Reports</a>
	<a href="/account">Account</a>
</nav>
<h2>
    As our sleeper agent, you must fulfill the following:
</h2>
<h2>Submit at least 3 reports</h2>
    
<h2>
    Submit at least 1 report at least 3 days ago 
</h2>
<button  on:click={closeModalAndRedirect}>I got this!</button>

<script>
	import { goto } from "$app/navigation";

    function closeModalAndRedirect() {
		goto('/dashboard');
	}
</script>