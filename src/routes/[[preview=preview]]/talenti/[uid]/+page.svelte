<script lang="ts">
	import { SliceZone } from "@prismicio/svelte";
	import { components } from "$lib/slices";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<div class="grid grid-cols-8 gap-x-4 gap-y-20">
	<SliceZone slices={data.page.data.slices} {components} />
</div>