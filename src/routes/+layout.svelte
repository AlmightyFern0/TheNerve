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

{@render children()}

<PrismicPreview {repositoryName} />