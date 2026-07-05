<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		let scroll: any

		import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
		scroll = new LocomotiveScroll()
		})

		return () => scroll?.destroy() // sync return
	})

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import tnLogo from '$lib/assets/tnLogo.png';
	import {page} from '$app/state';
	import { isFilled, asImageSrc } from '@prismicio/client';
	import { PrismicPreview } from "@prismicio/svelte/kit";
  	import { repositoryName } from "$lib/prismicio";

	let { children } = $props();
</script>

<svelte:head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href={favicon} />

	<title>{page.data.page?.data.meta_title ?? 'The Nerve Cabaret'}</title>

	{#if isFilled.keyText(page.data.page?.data.meta_description)}
		<meta name="description" content={page.data.page.data.meta_description} />
	{/if}

	{#if isFilled.image(page.data.page?.data.meta_image)}
		<meta property="og:image" content={asImageSrc(page.data.page.data.meta_image)} />
	{/if}
</svelte:head>

<main class="max-w-375" style="background-color: #0A0A0A;">
	<a href="/" aria-current={page.url.pathname === '/'}><img class="fixed top-8 ml-0 h-16 z-50" src={tnLogo} alt="Logo"></a>

	<a href="#main-content" class="absolute left-0 top-40 bg-black text-white py-2 px-4 z-50 transform -translate-x-full focus:translate-x-0 transition">Skip to main content</a>

	<div class="fixed w-[250vw] left-[-125vw] -ml-10 bottom-[-20vh] h-[40vh] bg-radial from-[#ff00bf] to-transparent to-50% opacity-50 z-50" style="pointer-events: none"></div>

	<nav class="fixed bottom-0 pb-6 w-full z-50 grid grid-cols-8">
		<ul class="gap-8 font-bold flex col-span-3">
			<li><a href="/talenti" aria-current={page.url.pathname === '/talenti'}>Talenti</a></li>
			<li><a href="/insights" aria-current={page.url.pathname === '/insights'}>Insights</a></li>
			<li><a href="/contact" aria-current={page.url.pathname === '/contact'}>Contact</a></li>
		</ul>
		<!--<b class="w-full col-start-4 col-end-6">Prossimo show 06/06/2026 // OffTopic</b>-->
	</nav>

	<div class="grid grid-cols-8 w-full overflow-x-hidden gap-x-4 gap-y-20" id="main-content">{@render children()}</div>
</main>

<PrismicPreview {repositoryName} />