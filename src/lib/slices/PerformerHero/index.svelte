<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import igLogo from '$lib/assets/igLogo.png';

	type Props = SliceComponentProps<Content.PerformerHeroSlice>;

	const { slice }: Props = $props();

	let scrollY = $state(0);

    const zoomOnScroll = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

    // scroll zoom in
    let scale = $derived(
        1 - zoomOnScroll(Math.min(scrollY / 600, 1))
    );
</script>

<svelte:window bind:scrollY />

<section
	class="static top-0 mt-10 left-0 grid col-span-8 grid-cols-subgrid {slice.variation != 'insights' ? 'h-[140vh] max-h-[2688px] -mb-40' : 'min-h-screen h-fit -mb-40'}"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
    <div class="grid col-span-8 grid-cols-subgrid">
        <h1 class="sticky top-30 -mb-2.5 col-span-5 z-10">{slice.primary.nome_performer}</h1>
        {#if slice.variation != 'insights'}
        <span class="col-span-4 col-start-5 z-50 mt-15">
            <div class="col-span-4 col-start-5 max-h-200 mt-30">
                <PrismicRichText field={slice.primary.bio} />
            </div>
            {#if slice.variation != 'show'}
                <PrismicLink field={slice.primary.instagram} class="col-start-5 mt-8 flex gap-2 max-w-fit">
                    <img src={igLogo} alt="Instagram Logo" class="h-6">
                    <b>@{slice.primary.instagram.text ?? 'jondoe'}</b>
                </PrismicLink>
            {/if}
        </span>
        {/if}
    </div>

    <img
        src={slice.primary.hero_background.url}
        alt={slice.primary.hero_background.alt}
        class="absolute top-0 left-0 col-span-8 z-0 w-screen h-screen max-h-[1920px] object-cover"
        style="transform: scale({scale}); transform-origin: center;"
    >
</section>

<style>
    section {background-color: #0A0A0A;}
</style>
