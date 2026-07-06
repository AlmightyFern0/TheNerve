<script lang="ts">
    import { isFilled, type Content } from '@prismicio/client';
    import type { SliceComponentProps } from '@prismicio/svelte';

    type Props = SliceComponentProps<Content.MarqueeSlice>;

    const { slice }: Props = $props();

    let scrollY = $state(0);

    const shows = $derived(
        slice.primary.marquee_titles
            .filter((item) => isFilled.keyText(item.title))
            .map((item) => item.title)
    );

    function shuffle<T>(items: T[]): T[] {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    // each lap is shuffled independently, so every title appears once per lap before any repeat
    function shuffledLaps<T>(items: T[], laps: number): T[] {
        return Array.from({ length: laps }, () => shuffle(items)).flat();
    }

    const row1Items = $derived(shuffledLaps(shows, 6));
    const row2Items = $derived(shuffledLaps(shows, 6));
    const row3Items = $derived(shuffledLaps(shows, 6));

    const speed = 0.3;
    let row1X = $derived(scrollY * speed);
    let row2X = $derived(-scrollY * speed - 500);
    let row3X = $derived(scrollY * speed - 250);
</script>

<svelte:window bind:scrollY />

<div class="col-span-8 flex flex-col gap-y-4">
    <div
        class="flex items-center whitespace-nowrap gap-x-20 ml-[-50%]"
        style="transform: translateX({row1X}px); will-change: transform;"
    >
        {#each row1Items as title}
            <h2 class="shrink-0 uppercase">{title}</h2>
        {/each}
    </div>
    <div
        class="flex items-center whitespace-nowrap gap-x-20"
        style="transform: translateX({row2X}px); will-change: transform;"
    >
        {#each row2Items as title}
            <h2 class="shrink-0 uppercase">{title}</h2>
        {/each}
    </div>
    <div
        class="flex items-center whitespace-nowrap gap-x-20 ml-[-10%]"
        style="transform: translateX({row3X}px); will-change: transform;"
    >
        {#each row3Items as title}
            <h2 class="shrink-0 uppercase">{title}</h2>
        {/each}
    </div>
</div>