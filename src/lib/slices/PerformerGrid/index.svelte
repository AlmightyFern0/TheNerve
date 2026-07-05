<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.PerformerGridSlice>;

	const { slice }: Props = $props();

	type GridPosition = {
		colStart: number;
		colSpan: number;
		rowStart: number;
		rowSpan: number;
		z: number;
	};

	// Position/size for each of the 9 image slots, taken from the reference designs
	// in src/lib/assets/performerGrid.svelte (default) and performerGridVariant.svelte (variant).
	const layouts: Record<Content.PerformerGridSlice['variation'], GridPosition[]> = {
		default: [
			{ colStart: 1, colSpan: 2, rowStart: 3, rowSpan: 4, z: 30 },
			{ colStart: 3, colSpan: 3, rowStart: 2, rowSpan: 5, z: 10 },
			{ colStart: 6, colSpan: 3, rowStart: 1, rowSpan: 6, z: 10 },
			{ colStart: 2, colSpan: 3, rowStart: 5, rowSpan: 5, z: 20 },
			{ colStart: 5, colSpan: 2, rowStart: 4, rowSpan: 4, z: 20 },
			{ colStart: 5, colSpan: 4, rowStart: 7, rowSpan: 4, z: 10 },
			{ colStart: 1, colSpan: 2, rowStart: 8, rowSpan: 3, z: 10 },
			{ colStart: 3, colSpan: 4, rowStart: 9, rowSpan: 3, z: 30 },
			{ colStart: 6, colSpan: 3, rowStart: 10, rowSpan: 3, z: 20 }
		],
		variant: [
			{ colStart: 1, colSpan: 2, rowStart: 2, rowSpan: 4, z: 30 },
			{ colStart: 3, colSpan: 3, rowStart: 3, rowSpan: 6, z: 10 },
			{ colStart: 6, colSpan: 3, rowStart: 1, rowSpan: 5, z: 50 },
			{ colStart: 1, colSpan: 4, rowStart: 5, rowSpan: 4, z: 30 },
			{ colStart: 5, colSpan: 2, rowStart: 4, rowSpan: 3, z: 40 },
			{ colStart: 6, colSpan: 3, rowStart: 6, rowSpan: 3, z: 30 },
			{ colStart: 1, colSpan: 4, rowStart: 9, rowSpan: 3, z: 20 },
			{ colStart: 4, colSpan: 3, rowStart: 8, rowSpan: 5, z: 20 },
			{ colStart: 6, colSpan: 3, rowStart: 9, rowSpan: 3, z: 30 }
		]
	};

	// img_1..img_9 are 9 separate Image fields in Prismic (not a repeatable
	// group), so they're zipped into an array here to pair each one with its
	// grid position and make the markup below a single {#each} loop.
	const items = $derived.by(() => {
		const images = [
			slice.primary.img_1,
			slice.primary.img_2,
			slice.primary.img_3,
			slice.primary.img_4,
			slice.primary.img_5,
			slice.primary.img_6,
			slice.primary.img_7,
			slice.primary.img_8,
			slice.primary.img_9
		];

		return layouts[slice.variation]
			.map((position, i) => ({ position, image: images[i] }))
			.filter((item) => isFilled.image(item.image));
	});
</script>

<section
	class="relative top-0 grid col-span-8 grid-cols-subgrid"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="col-span-8 grid gap-y-4 grid-cols-subgrid grid-rows-12 max-h-408.75 min-w-full place-content-center">
		{#each items as item}
			<div
				style="grid-column: {item.position.colStart} / span {item.position.colSpan}; grid-row: {item.position.rowStart} / span {item.position.rowSpan}; z-index: {item.position.z};"
			>
				<img src={item.image.url} alt={item.image.alt ?? ''} class="w-full h-full object-cover">
			</div>
		{/each}
	</div>
</section>
