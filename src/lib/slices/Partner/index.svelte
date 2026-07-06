<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import {PrismicRichText, PrismicLink} from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.PartnerSlice>;

	const { slice }: Props = $props();
</script>

<section 
	class="col-span-8 grid grid-cols-subgrid gap-x-4 gap-y-20 min-w-full"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	{#each slice.primary.partner as {cover, title, description, partner_link}, i}
		{#if isFilled.link(partner_link) == true}

			<PrismicLink field={partner_link ?? ''} class="col-span-4 grid grid-cols-4">
				<img src="{cover.url}" alt="{cover.alt}" class="col-span-4 mb-8 w-full h-154.5 object-cover">
				<p class="col-span-4 cardTitle mb-2"><b class="cardTitle">{title}</b></p>
				<span class="col-span-3">
					<PrismicRichText field={description} />
				</span>
			</PrismicLink>

		{:else}
		
			<div class="col-span-4 grid grid-cols-4">
				<img src="{cover.url}" alt="{cover.alt}" class="col-span-4 mb-8 w-full h-154.5 object-cover">
				<p class="col-span-4 cardTitle mb-2"><b class="cardTitle">{title}</b></p>
				<span class="col-span-3">
					<PrismicRichText field={description} />
				</span>
			</div>
		{/if}
	{/each}
</section>