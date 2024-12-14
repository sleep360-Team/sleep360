<nav class="navbar navbar-dark fixed-top">
	<a href="/">Home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
	<a href="/Reports">Reports</a>
    <a href="/dashboard">Dashboard</a>
</nav>
<script>
  
    // Example report data (could come from an API or a store in a real application)
    let reports = [
      { reportId: 1, title: "Report 1", timeReported: '11:11' },
      { reportId: 2, title: "Report 2", timeReported: '11:12' },
      { reportId: 3, title: "Report 3", timeReported: '11:13' },
      { reportId: 4, title: "Report 4", timeReported: '11:14' }
    ];
  
    
  </script>
  
  <main>
    <h1>Reports</h1>
  
    <ul>
      {#each reports as report}
      <li>
        <a href={`/report/${report.reportId}`}>
          Report ID: {report.reportId} - {report.timeReported}
        </a>
      </li>
      {/each}
    </ul>
  </main>
  
  <style>
    main {
      padding: 20px;
      font-family: Arial, sans-serif;
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
      font-size: 16px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>