<svelte:head>
    <title>Recommendations</title> 
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
  import { onMount } from 'svelte';
  import { showModal } from './store.js'; 

  let recommendations = [];
  let currentRec;
  let selectedRecommendation = null;
  
  // Fetch 3 random recommendations from the backend
  async function fetchRecommendations() {
    const response = await fetch('/recommendations');
    if (response.ok) {
      recommendations = await response.json();
    } else {
      console.error('Failed to fetch recommendations');
    }
  }

  async function fetchCurrentRecommendation() {
    const response = await fetch('/recommendations/subroutes');
    if (response.ok) {
      console.log("Yay!");
      currentRec = await response.json();
      console.log(currentRec);
      console.log(currentRec['recordset'][0]["Description"]);
      currentRec = currentRec['recordset'][0]["Description"];
    } else {
      console.error('Failed to fetch recommendation');
    }
  }

  // Handle recommendation selection
  async function selectRecommendation(recommendation) {
    if (selectedRecommendation == null) {
      selectedRecommendation = recommendation;
      console.log('Selected recommendation:', selectedRecommendation);
      // console.log(JSON.stringify({selectedRecommendation}));
      const response = await fetch('/recommendations', {
        method: 'POST',
        body: JSON.stringify({selectedRecommendation}),
        headers: {
        'Content-Type': 'application/json'}
      });
      console.log(response);
  }
  }
  // function closeModalAndRedirect() {
  //       showModal.set(false);  // Close the modal
  //       goto('/dashboard');    // Redirect to the dashboard
  //   }

  // Load recommendations when the component mounts
  onMount(() => {
    fetchCurrentRecommendation();
    console.log("YIPPEE!");
    console.log(currentRec);
    fetchRecommendations();
  });
</script>

<h1>Recommendations</h1>

{#if currentRec != null}
  <p>
    Your current recommendation is:
    <br>
    {currentRec}
  </p>
{:else}
  {#if recommendations.length > 0}
    <p>{currentRec}</p>
    <ul>
      {#each recommendations as recommendation}
        <li>
          <button on:click={() => selectRecommendation(recommendation)}>
            {recommendation.Description} <!-- Adjust the fields accordingly -->
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading recommendations...</p>
  {/if}
{/if}

{#if selectedRecommendation}
  <div class="selected">
    <h2>You selected:</h2>
    <p>{selectedRecommendation.Description}</p> <!-- Adjust this to display the relevant data -->
  </div>
{/if}

<style>
  .navbar {
        background-color: #800000;
        color: white;
    }
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  button {
    padding: 10px;
    background-color: #800000;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #700000;
  }

  .selected {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
  }
</style>
