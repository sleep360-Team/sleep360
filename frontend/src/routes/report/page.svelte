<nav class="navbar navbar-dark fixed-top">
	<a href="/">home</a>
	<a href="/report">Report Sleep</a>
</nav>

<h1>Welcome</h1>
<p>this is the Report page</p>

<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let creating = false;
	/**
	 * @type {any[]}
	 */
	let deleting = [];
</script>

<div class="centered">
	<h1>todos</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="?/create"
		use:enhance={() => {
			creating = true;

			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	>
		<label>
			add a todo:
			<input
				disabled={creating}
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
			/>
		</label>
	</form>

	<ul class="todos">
		{#each data.todos.filter((/** @type {{ id: any; }} */ todo) => !deleting.includes(todo.id)) as todo (todo.id)}
			<li in:fly={{ y: 20 }} out:slide>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						deleting = [...deleting, todo.id];
						return async ({ update }) => {
							await update();
							deleting = deleting.filter((id) => id !== todo.id);
						};
					}}
				>
				{#if deleting.includes(todo.id)}
				<span class="deleting">deleting...</span>
				{/if}

					<input type="hidden" name="id" value={todo.id} />
					<span>{todo.description}</span>
					<button aria-label="Mark as complete"></button>
				</form>
			</li>
		{/each}
	</ul>

	{#if creating}
		<span class="saving">saving...</span>
	{/if}
</div>

<style>
	body {
    background: #DDDDDD;
}

.navbar {
    background-color: #800000;
    color: white;
}
.navbar a {
        color: white; /* Change link color to white */
        text-decoration: none; /* Remove underline */
    }

	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
	.deleting {
				opacity: 0.5;
			}
</style>