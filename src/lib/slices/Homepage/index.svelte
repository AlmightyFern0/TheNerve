<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { PrismicRichText } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.HomepageSlice>;

	const { slice }: Props = $props();
</script>

<div class="grid grid-cols-8 gap-4">
    <h1 class="col-span-5 homeTN">{slice.primary.hero_title}</h1>

    <span class="col-span-5">
		<PrismicRichText field={slice.primary.hero_description} />
	</span>
</div>
