<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="grid col-span-8 place-items-center min-h-[60vh] gap-4 text-center">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
	<a href="/">Back to home</a>
</div>
