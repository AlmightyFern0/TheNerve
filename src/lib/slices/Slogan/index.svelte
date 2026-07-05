<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.SloganSlice>;

	const { slice }: Props = $props();
</script>

<section class="relative top-0 grid col-span-8 grid-cols-subgrid">
        <h2 class="col-span-6 mb-4">{slice.primary.slogan}</h2>
</section>

<style>
    section {background-color: #0A0A0A;}
</style>