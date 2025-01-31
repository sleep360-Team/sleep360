<nav class="navbar">
  <div class="logo">
    Sleep360
  </div>
	<a href="/Reports">Reports</a>
  <a href="/report">Add Report</a>
	<a href="/account">Account</a>
  <a href="/dashboard">Dashboard</a>
</nav>
<script>
  export let data;
  let recordset = [];
  
    
  </script>
  
  <main>
    <h1>Reports</h1>
  
    {#await data.recordSet}
    <p>Loading...</p>
{:then result}
    <!-- Your chart code here using result.recordset -->
    {#each result.recordset as r}
		<div class = "reportDiv">
      <p>Time Reported: {r["Time Reported"]}</p>
      <p>Number of Hours: {r["Number Hours"]}</p>
      <p>Number of Interruptions: {r["Number Interruptions"]}</p>
      <p>Quality of Sleep: {r["Quality of Sleep"]}</p>
      <p>Comments: </p>
      {#if  r["Comments"] != null}
      <p>{r["Comments"]}</p>
      {:else}
	<p>N/A</p>
      {/if}
    </div>
	  {/each}
{:catch error}
    <p>Error: {error.message}</p>
{/await}
  </main>
  
  <style>
    main {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .reportDiv {
      border: 5px solid gray;
      
      margin: 10px;
    }
    
  </style>