
<svelte:head>
		
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Sleep360</title>
</svelte:head>
<nav class="navbar navbar-dark">
	<a href="/">Home </a>
	<a href="/report">Report Sleep</a>
</nav>

<h1>Welcome</h1>
<p>this is the Main page</p>
<button type="button" data-amount="1" style="background-color: #800000; color: white;" class="btn btn-primary">Report</button>
<button type="button" data-amount="1" style="background-color: #800000; color: white;" class="btn btn-primary">Edit Log</button>
<style>
    :global(body)  {
        font-family: 'DM Serif Display', serif;
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

</style>
