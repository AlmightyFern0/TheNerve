<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import igLogo from '$lib/assets/igLogo.png';

	type Props = SliceComponentProps<Content.DescrizioneSlice>;

	const { slice }: Props = $props();
</script>

<section 
	class="col-span-8 grid grid-cols-subgrid"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
    <span class="col-span-6 col-start-1 grid mb-20">
        {#if slice.variation == 'default'}
			<h2 class="col-span-6 -mb-16">{slice.primary.titolo}</h2>
		{/if}
	</span>

	<span class="col-span-4 col-start-1 mt-0">
        <div class="col-span-4 col-start-1 max-h-200">
            <PrismicRichText field={slice.primary.descrizione} />
        </div>
		{#if isFilled.link(slice.primary.instagram)}
        	<PrismicLink field={slice.primary.instagram} class="col-start-1 mt-8 flex gap-2 max-w-fit">
            	<img src={igLogo} alt="Instagram Logo" class="h-6">
            	<b>@{slice.primary.instagram.text ?? 'jondoe'}</b>
        	</PrismicLink>
		{/if}
    </span>		
</section>
