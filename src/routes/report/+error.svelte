<script>
	import { page } from '$app/stores';
</script>

<h1>
	{$page.status}: {#if $page.error}{$page.error.message}{/if}
</h1>
