<nav class="navbar navbar-dark fixed-top">
	<a href="/">Home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
	<a href="/Reports">Reports</a>
    <a href="/dashboard">Dashboard</a>
</nav>

 <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
  </div>

<script>

    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import 'chartjs-adapter-date-fns';
    
    export let data;
    let recordset = [];
  
    data.recordSet.then(function(result){
      recordset = result.recordset;
      console.log(result.recordset);
    })
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
console.log(recordset);
for (let i = 0; i <= 6; i++) {
    const date = recordset[i];
    dateMap.set(date, dateMap.get(date) + recordset[i]);
}

    

    // Sample time series data
    const timeSeriesData = {
      labels: [
        dates[0].toISOString().slice(0,10),
        dates[1].toISOString().slice(0,10),
        dates[2].toISOString().slice(0,10),
        dates[3].toISOString().slice(0,10),
        dates[4].toISOString().slice(0,10),
        dates[5].toISOString().slice(0,10),
        dates[6].toISOString().slice(0,10)
      ],
      datasets: [{
        label: 'Hours',
        data: [
          { x: dates[0].toISOString().slice(0,10), y: dateMap.get(dates[0]) },
          { x: dates[1].toISOString().slice(0,10), y: dateMap.get(dates[1])  },
          { x: dates[2].toISOString().slice(0,10), y: dateMap.get(dates[2])  },
          { x: dates[3].toISOString().slice(0,10), y: dateMap.get(dates[3]) },
          { x: dates[4].toISOString().slice(0,10), y: dateMap.get(dates[4])  },
          { x: dates[5].toISOString().slice(0,10), y: dateMap.get(dates[5])  },
          { x: dates[6].toISOString().slice(0,10), y: dateMap.get(dates[6])  }
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
{#if recordset.length > 0}
    <ul>
        {#each recordset as record}
            <li>{JSON.stringify(record['Number Hours'])}</li>
        {/each}
    </ul>
{:else}
    <p>Loading data...</p>
{/if}


  





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
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #800000;
        color: white;
        border: none;
        cursor: pointer;
    }
    
</style>