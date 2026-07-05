<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.GridSlice>;

	const { slice }: Props = $props();
</script>

<section
	class="relative top-0 col-span-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 auto-rows-0.25 gap-x-4 gap-y-0"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	{#each slice.primary.grid_element as { grid_img }, i}
		{@const isTallColumn = i === 1 || i === 3}
		<div
			class="col-span-1 md:col-span-2 row-span-316 md:row-span-406 {isTallColumn
				? 'lg:row-span-591'
				: 'lg:row-span-476'}"
		>
			<img
				src={grid_img.url}
				alt={grid_img.alt ?? ''}
				class="w-full object-cover h-[300px] md:h-[390px] {isTallColumn
					? 'lg:h-[575px]'
					: 'lg:h-[460px]'}"
			>
		</div>
	{/each}
</section>
