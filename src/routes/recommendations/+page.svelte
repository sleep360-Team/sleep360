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

  // Handle recommendation selection
  function selectRecommendation(recommendation) {
    selectedRecommendation = recommendation;
    console.log('Selected recommendation:', selectedRecommendation);
  }
  function closeModalAndRedirect() {
        showModal.set(false);  // Close the modal
        goto('/dashboard');    // Redirect to the dashboard
    }

  // Load recommendations when the component mounts
  onMount(() => {
    fetchRecommendations();
  });
</script>

<h1>Recommendations</h1>

{#if recommendations.length > 0}
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

{#if selectedRecommendation}
  <div class="selected">
    <h2>You selected:</h2>
    <p>{selectedRecommendation.Description}</p> <!-- Adjust this to display the relevant data -->
  </div>
{/if}

<style>
  .navbar {
        background-color: #008CBA;
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
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #007B9E;
  }

  .selected {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
  }
</style>
