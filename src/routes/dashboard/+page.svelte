<svelte:head>
    <title>Dashboard</title> 
</svelte:head>

<nav class="navbar">
    <div class="logo">
        Sleep360
      </div>
  <a href="/dashboard">Dashboard</a>
  <a href="/report">Add Report</a>
  <a href="/reports">Reports</a>
  <a href="/account">Account</a>
  <form method="POST">
  <button formaction="?/logout" type="submit">
    Log Out
  </button>
  </form>
</nav>

<div title="chart-container" class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>

<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import 'chartjs-adapter-date-fns';
  
  export let data;
  let recordset = [];
  let chartCanvas;
  let chartInstance;
  
  // Move all data processing and chart creation inside this async function
  function initializeChart(data) {
      // Wait for recordset data
      
      // Process dates
      let dateObj = new Date();
      const dates = [];
      for (let i = 0; i <= 6; i++) {
          const prevDate = new Date(dateObj);
          prevDate.setDate(prevDate.getDate() - i);
          dates[i] = prevDate;
      }
      
      const dateMap = new Map();
      dates.forEach(date => {
          const dateString = date.toISOString().slice(0,10);
          dateMap.set(dateString, 0);
      });

      // Now process recordset after it's loaded
      for (let i = 0; i < data.length; i++) {
          let d = new Date(data[i]['Time Reported'].toString());
          const date = d.toISOString().slice(0,10); // Assuming there's a Date field
          const hours = data[i]['Number Hours'];
          if (dateMap.has(date)) {
              dateMap.set(date, dateMap.get(date) + hours);
          }
      }

      const timeSeriesData = {
          labels: dates.map(date => date.toISOString().slice(0,10)),
          datasets: [{
              label: 'Hours',
              data: dates.map(date => ({
                  x: date.toISOString().slice(0,10),
                  y: dateMap.get(date.toISOString().slice(0,10))
              })),
              borderColor: '#800000',
              tension: 0.1
          }]
      };

      // Create Chart.js instance
      chartInstance = new Chart(chartCanvas, {
          type: 'line',
          data: timeSeriesData,
          options: {
              responsive: true,
              scales: {
                  x: {
                      type: 'time',
                      time: {
                          unit: 'day'
                      },
                      title: {
                          display: true,
                          text: 'Date'
                      }
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Amount of Sleep'
                      }
                  }
              },
              plugins: {
                  title: {
                      display: true,
                      text: 'Your Recent Sleep Patterns'
                  },
                  tooltip: {
                      mode: 'index',
                      intersect: false
                  }
              }
          }
      });
  }

  onMount(() => {
    data.recordSet.then(result => {
        initializeChart(result.recordset);
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
      
      // Cleanup function
      return () => {
          if (chartInstance) {
              chartInstance.destroy();
          }
      };
  });
</script>

{#await data.recordSet}
    <p>Loading...</p>
{:then result}
   
{:catch error}
    <p>Error: {error.message}</p>
{/await}



<a href="/report">
  <button id='make-report'>Add Report</button>
</a>

<style>
  .chart-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
  }
  button {
      margin-top: 0rem;
      padding: 0.5rem;
      background-color: #800000;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1rem
  }
</style>