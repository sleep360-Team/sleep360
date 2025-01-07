<nav class="navbar navbar-dark fixed-top">
	<a href="/">Home</a>
	<a href="/report">Report</a>
	<a href="/account">Account</a>
	<a href="/Reports">Reports</a>
    <a href="/dashboard">Dashboard</a>
</nav>

<script>
    import { enhance } from '$app/forms';

    let creating = false;
    let numberHours = 0;  // Default value for numHours
    let numberInterrupts = 0;  // Default value for numInterrupts
    let qualitySleep = 3;  // Default value for qualitySleep
    let comments = '';
    // Map sleep quality number to a string
    const getSleepQualityString = (/** @type {number} */ value) => {
        switch (value) {
            case 1: return 'Worst';
            case 2: return 'Poor';
            case 3: return 'Average';
            case 4: return 'Good';
            case 5: return 'Best';
        }
    };
</script>

<div class="centered">
    <h2>Report Information</h2>
	<form method="POST" action="?/create">

        <!-- Number of Hours Slept -->
        <label>
            Number of Hours Slept:
            <input
                type="number"
				name="numberHours"
                bind:value={numberHours}
                min="0"
                max="11"
                required
            />
            <input
                type="range"
				name="numberHours"
                bind:value={numberHours}
                min="0"
                max="11"
            />
        </label>

        <!-- Number of Interruptions -->
        <label>
            Number of Interruptions:
            <input
                type="number"
				name="numberInterrupts"
                bind:value={numberInterrupts}
                min="0"
                max="4"
                required
            />
            <input
                type="range"
				name="numberInterrupts"
                bind:value={numberInterrupts}
                min="0"
                max="4"
            />
        </label>
        
        <!-- Quality of Sleep (1-5) -->
        <label>
            Quality of Sleep (1-5):
            <input
                type="number"
				name="qualitySleep"
                bind:value={qualitySleep}
                min="1"
                max="5"
                required
            />
            <input
                type="range"
				name="qualitySleep"
                bind:value={qualitySleep}
                min="1"
                max="5"
            />
            <span>{getSleepQualityString(qualitySleep)}</span> <!-- Display corresponding sleep quality string -->
        </label>
       
          <textarea
            id="commentBox"
            class="textarea"
            bind:value={comments}
            placeholder="Write any details you'd like to record here..."
            rows="4"
            cols="50"
          ></textarea>


        <button formaction="?/create" type="submit" disabled={creating}>
            {creating ? 'Saving...' : 'Submit Report'}
        </button>
    </form>
</div>

<style>
    .centered {
        max-width: 20em;
        margin: 0 auto;
    }
    

    label {
        display: block;
        margin-top: 1rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }

    span {
        display: inline-block;
        margin-top: 0.5rem;
        font-weight: bold;
        color: #800000;
    }
</style>
