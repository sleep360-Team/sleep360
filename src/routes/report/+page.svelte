<nav class="navbar navbar-dark fixed-top">
    <a href="/">Home</a>
    <a href="/report">Report</a>
    <a href="/account">Account</a>
</nav>

<script>
    import { enhance } from '$app/forms';

    let creating = false;
    let numHours = 0;  // Default value for numHours
    let numInterrupts = 0;  // Default value for numInterrupts
    let qualitySleep = 3;  // Default value for qualitySleep

    // Automatically generate the current date and time (ISO format)
    let timeReported = new Date().toISOString(); // Current time in ISO format (e.g., "2024-11-08T14:30:00.000Z")

    // Map sleep quality number to a string
    const getSleepQualityString = (/** @type {number} */ value) => {
        switch (value) {
            case 1: return 'Worst';
            case 2: return 'Poor';
            case 3: return 'Average';
            case 4: return 'Good';
            case 5: return 'Best';
            default: return 'Unknown';
        }
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async () => {
        creating = true;
        try {
            const response = await fetch('/report', {
                method: 'POST',
                body: JSON.stringify({
                    timeReported,
                    numHours,
                    numInterrupts,
                    qualitySleep
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                alert('Report created successfully!');
            } else {
                alert('Error creating report.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting the report.');
        } finally {
            creating = false;
        }
    };
</script>

<div class="centered">
    <h2>Report Information</h2>

    <form on:submit|preventDefault={handleSubmit}>

        <!-- Number of Hours Slept -->
        <label>
            Number of Hours Slept:
            <input
                type="number"
                bind:value={numHours}
                min="0"
                max="11"
                required
            />
            <input
                type="range"
                bind:value={numHours}
                min="0"
                max="11"
            />
        </label>

        <!-- Number of Interruptions -->
        <label>
            Number of Interruptions:
            <input
                type="number"
                bind:value={numInterrupts}
                min="0"
                max="4"
                required
            />
            <input
                type="range"
                bind:value={numInterrupts}
                min="0"
                max="4"
            />
        </label>

        <!-- Quality of Sleep (1-5) -->
        <label>
            Quality of Sleep (1-5):
            <input
                type="number"
                bind:value={qualitySleep}
                min="1"
                max="5"
                required
            />
            <input
                type="range"
                bind:value={qualitySleep}
                min="1"
                max="5"
            />
            <span>{getSleepQualityString(qualitySleep)}</span> <!-- Display corresponding sleep quality string -->
        </label>

        <button type="submit" disabled={creating}>
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

    button {
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    button[disabled] {
        background-color: #ccc;
    }

    span {
        display: inline-block;
        margin-top: 0.5rem;
        font-weight: bold;
        color: #007bff;
    }
</style>
