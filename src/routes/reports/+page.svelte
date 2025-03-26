<svelte:head>
    <title>Reports</title> 
</svelte:head>


<nav class="navbar">
  <div class="logo">
    Sleep360
  </div>
	<a href="/dashboard">Dashboard</a>
  <a href="/report">Add Report</a>
  <a href="/reports">Reports</a>
  <a href="/account">Account</a>
</nav>


<script>
  export let data;
  let recordset = [];
  
      // Function to format the time
  function formatTime(timeString) {
      const date = new Date(timeString);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      return `${formattedDate} at ${formattedTime}`;
  }
  </script>
  
  <main>
    <h1>Reports</h1>
  
    {#await data.recordSet}
    <p>Loading...</p>
{:then result}
    {#each result.recordset as r}
		<div class = "reportDiv" id = {r["ReportID"]}>
      <p>Time Reported: {formatTime(r["Time Reported"])}</p>
      <p>Number of Hours: {r["Number Hours"]}</p>
      <p>Number of Interruptions: {r["Number Interruptions"]}</p>
      <p>Quality of Sleep: {r["Quality of Sleep"]}</p>
      <p>Comments: </p>
      {#if  r["Comments"] != null}
      <p>{r["Comments"]}</p>
      {:else}
	<p>N/A</p>
      {/if}
      <button id = {r["ReportID"]}>Delete Report</button>
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