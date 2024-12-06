<nav class="navbar navbar-dark fixed-top">
	<a href="/">Home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
	<a href="/Reports">Reports</a>
    <a href="/dashboard">Dashboard</a>
</nav>

<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import 'chartjs-adapter-date-fns';
  
    // Sample time series data
    const timeSeriesData = {
      labels: [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
        '2024-01-04',
        '2024-01-05',
        '2024-01-06',
        '2024-01-07'
      ],
      datasets: [{
        label: 'Hours',
        data: [
          { x: '2024-01-01', y: 6 },
          { x: '2024-01-02', y: 3 },
          { x: '2024-01-03', y: 4.5 },
          { x: '2024-01-04', y: 8 },
          { x: '2024-01-05', y: 2 },
          { x: '2024-01-06', y: 6 },
          { x: '2024-01-07', y: 7 }
        ],
        borderColor: '#800000',
        tension: 0.1
      }]
    };
  
    let chartCanvas;
    let chartInstance;
  
    onMount(() => {
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
  
      // Cleanup function
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    });
  </script>
  
  <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
  </div>




<a href="/report">
    <button>Add Report</button>
</a>

<style>
  .chart-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
    button {
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #800000;
        color: white;
        border: none;
        cursor: pointer;
    }
    
</style>