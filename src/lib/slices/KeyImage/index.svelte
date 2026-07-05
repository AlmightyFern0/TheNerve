<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.KeyImageSlice>;

	const { slice }: Props = $props();
</script>

<img src={slice.primary.key_img.url} alt={slice.primary.key_img.alt} class="col-span-8 h-212.5 w-screen object-cover">

<style>
	img {background-color: #0a0a0a;}
</style>