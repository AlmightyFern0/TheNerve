<script lang="ts">
    import { isFilled, type Content } from '@prismicio/client';
    import type { SliceComponentProps } from '@prismicio/svelte';
    import { PrismicRichText, PrismicLink } from '@prismicio/svelte';

    type Props = SliceComponentProps<Content.HomepageSlice>;

    const { slice }: Props = $props();

    let columnHeight = $state(0);

    const linkedShows = $derived(
        (slice.primary.show_link ?? [])
            .map((item) => item.show)
            .filter(isFilled.contentRelationship)
            .filter((show) => isFilled.image(show.data?.meta_image))
    );

    // exponential growth curve: each slide is `growthRatio` times taller than the one below it
    const growth = 0.25;
    const minSize = 0.08;
    const growthRatio = Math.exp(growth);

    // how many slides are needed on screen at once before growth pushes them past the column height
    const slideCount = Math.max(1, Math.ceil(Math.log(1 + (growthRatio - 1) / minSize) / growth));

    const wrap = (value: number, max: number) => ((value % max) + max) % max;
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    // distance from the column's bottom edge to the bottom of slide `position` (position 0 sits at 0px)
    const edgeY = (position: number, height: number) =>
        (height * minSize * (growthRatio ** position - 1)) / (growthRatio - 1);

    // the page itself never scrolls (this slice is the whole viewport), so motion is self-driven:
    // a constant autoplay drift plus wheel/touch/pointer drag, both feeding the same smoothed target
    const autoplaySpeed = 0.0000625; // position units per ms of idle drift
    const dragSpeed = 0.0014; // wheel/touch delta px -> position units
    const smoothing = 0.075; // lerp factor per frame, higher = snappier

    let scrollTarget = $state(0);
    let scroll = $state(0);
    let lastPointerY: number | null = null;
    let pointerDownAt: { x: number; y: number } | null = null;
    let isDragging = false;
    const dragThreshold = 4; // px of movement before a press counts as a drag rather than a click

    function onWheel(event: WheelEvent) {
        event.preventDefault();
        scrollTarget += (event.deltaY + event.deltaX) * dragSpeed;
    }

    function onPointerDown(event: PointerEvent) {
        pointerDownAt = { x: event.clientX, y: event.clientY };
        lastPointerY = event.clientY;
        isDragging = false;
    }

    function onPointerMove(event: PointerEvent) {
        if (lastPointerY === null || pointerDownAt === null) return;

        if (!isDragging) {
            const moved = Math.hypot(event.clientX - pointerDownAt.x, event.clientY - pointerDownAt.y);
            if (moved < dragThreshold) return;
            isDragging = true;
            // only capture once an actual drag is confirmed, so a plain click still reaches the link underneath
            (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        }

        scrollTarget += (lastPointerY - event.clientY) * dragSpeed;
        lastPointerY = event.clientY;
    }

    function releasePointer() {
        lastPointerY = null;
        pointerDownAt = null;
        isDragging = false;
    }

    $effect(() => {
        let frame = requestAnimationFrame(tick);
        let lastTime = performance.now();

        function tick(time: number) {
            const dt = time - lastTime;
            lastTime = time;

            scrollTarget += autoplaySpeed * dt;
            scroll = lerp(scroll, scrollTarget, smoothing);

            frame = requestAnimationFrame(tick);
        }

        return () => cancelAnimationFrame(frame);
    });

    const slides = $derived.by(() => {
        if (linkedShows.length === 0 || columnHeight === 0) return [];

        return Array.from({ length: slideCount }, (_, i) => {
            let position = i;
            while (edgeY(position + scroll, columnHeight) > columnHeight) position -= slideCount;
            while (edgeY(position + scroll + 1, columnHeight) < 0) position += slideCount;

            const bottom = edgeY(position + scroll, columnHeight);
            const top = edgeY(position + scroll + 1, columnHeight);
            const show = linkedShows[wrap(position, linkedShows.length)];

            return {
                show,
                image: show.data!.meta_image,
                bottom,
                height: top - bottom
            };
        });
    });
</script>

<div
    class="grid grid-cols-8 gap-4 w-screen"
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
>
    <div class="fixed grid grid-cols-8 gap-4 max-h-screen w-screen pointer-events-none">
        <h1 class="col-span-5 homeTN">{slice.primary.hero_title}</h1>

        <span class="col-span-5">
            <PrismicRichText field={slice.primary.hero_description} />
        </span>
    </div>

    <div
        class="col-span-4 col-start-5 row-span-2 h-screen -mt-30 relative overflow-hidden cursor-grab select-none"
        role="presentation"
        bind:clientHeight={columnHeight}
        onwheel={onWheel}
        onpointerdown={onPointerDown}
        onpointermove={onPointerMove}
        onpointerup={releasePointer}
        onpointercancel={releasePointer}
    >
        {#each slides as slide}
            <PrismicLink
                field={slide.show}
                class="absolute right-0 block"
                style="bottom: {slide.bottom}px; height: {slide.height}px; width: calc(2.25 * {slide.height}px);"
            >
                <img src={slide.image.url} alt={slide.image.alt ?? ''} class="h-full w-full object-cover">
            </PrismicLink>
        {/each}
    </div>
</div>

