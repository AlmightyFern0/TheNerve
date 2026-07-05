<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	import tnLogo from '$lib/assets/tnLogo.png';
	import {page} from '$app/state';

	type Props = SliceComponentProps<Content.FooterSlice>;

	const { slice }: Props = $props();
</script>

<footer class="grid grid-cols-8 gap-x-4 w-full my-40">
    <h1 class="col-span-8 text-center">{slice.primary.motto}</h1>

	{#if slice.variation == 'footerPerformer'}
		<div class="col-span-8 flex flex-row w-full my-40">
			<a href="http://google.com" class="uppercase">
				<b>Perfomer</b>
			</a>

			<hr class="flex-1 border-white mx-4 mt-3.5">

			<p class="text-center capitalize"><b>Altri Performer</b></p>

			<hr class="flex-1 border-white mx-4 mt-3.5">

			<a href="http://google.com" class="text-right uppercase">
				<b>Performer</b>
			</a>
		</div>

	{:else if slice.variation == 'default'}

		<div class="col-span-8 flex flex-row w-full my-40">
			<a href="http://google.com" class="uppercase">
				<b>show</b>
			</a>

			<hr class="flex-1 border-white mx-4 mt-3.5">

			<p class="text-center capitalize"><b>Altri Show</b></p>

			<hr class="flex-1 border-white mx-4 mt-3.5">

			<a href="http://google.com" class="text-right uppercase">
				<b>show</b>
			</a>
		</div>
	{/if}

    <div class="col-span-8 grid grid-cols-subgrid">
        <div class="col-span-2">
            <ul>
                <li><a href="https://google.com" class="text-sm">contact@thenerve.com</a></li>
                <li><a href="https://google.com" class="text-sm">talents@thenerve.com</a></li>
                <li><a href="https://google.com" class="text-sm">+39 123 4567 890</a></li>
                <br>
                <li><a href="https://google.com" class="text-sm uppercase">instagram</a></li>
            </ul>
        </div>

        <div class="col-span-2">
            <ul>
                <li>
                    <a href="https://google.com" class="text-sm">
                        <b class="uppercase font-bold">Offtopic</b><br>
                        <span>Lungo Dora Firenze, 131/A, 10153 Torino TO</span>
                    </a>
                </li>
                <br>
                <li>
                    <a href="https://google.com" class="text-sm">
                        <b class="uppercase font-bold">Q35</b><br>
                        <span>Lungo Dora Firenze, 131/A, 10153 Torino TO</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="col-span-3 col-start-6">
            <a href="/" aria-current={page.url.pathname === '/'}><img class="w-full -mt-8" src={tnLogo} alt="Logo"></a>
        </div>

        <div class="col-span-4 mt-8">
            <span class="text-sm text-white">Design and code by <b class="smallFooter"><a href="https://lorenzomarcomin.com" target="_blank" rel="noopener noreferrer">Lorenzo Marcomin</a></b></span>
        </div>
        <div class="col-span-4 mt-8 text-right">
            <span class="text-sm text-white">© All rights reserved. 2026 The Nerve</span>
        </div>
    </div>
</footer>