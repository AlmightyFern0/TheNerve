<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import gsap from 'gsap';

	type Props = SliceComponentProps<Content.TalentiSlice>;

	const { slice }: Props = $props();

	const stripSitePrefix = (title: string | null | undefined) =>
		title?.replace(/^The Nerve \| /, '') ?? '';

	let columnHeight = $state(0);
	let lapHeight = $state(0);

	const linkedTalents = $derived(
		(slice.primary.talents ?? [])
			.map((item) => item.talent)
			.filter(isFilled.contentRelationship)
			.filter((talent) => isFilled.keyText(talent.data?.meta_title))
			.map((talent) => ({ talent, name: stripSitePrefix(talent.data!.meta_title) }))
	);

	// mouse-follow image trail (adapted from Codrops' Image Trail demo), layered above the scrolling names
	const aspectRatios = ['1/1', '3/4', '4/3', '9/16', '2/3'];

	const trailImages = $derived(
		linkedTalents
			.filter(({ talent }) => isFilled.image(talent.data?.meta_image))
			.map(({ talent, name }) => ({
				url: talent.data!.meta_image.url!,
				alt: name,
				ratio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
			}))
	);

	let sectionEl: HTMLElement | undefined = $state();
	let trailImgEls: HTMLImageElement[] = [];

	function distance(x1: number, y1: number, x2: number, y2: number) {
		return Math.hypot(x2 - x1, y2 - y1);
	}

	let mousePos = { x: 0, y: 0 };
	let lastMousePos = { x: 0, y: 0 };
	let cacheMousePos = { x: 0, y: 0 };

	function onTrailMouseMove(event: MouseEvent) {
		if (!sectionEl) return;
		const rect = sectionEl.getBoundingClientRect();
		mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
	}

	$effect(() => {
		if (trailImgEls.length === 0) return;

		let imgPosition = 0;
		let zIndexVal = 1;
		const threshold = 100; // px of mouse movement required to trigger the next image
		let frame: number;

		function showNextImage() {
			const img = trailImgEls[imgPosition];
			gsap.killTweensOf(img);
			const rect = img.getBoundingClientRect();

			gsap
				.timeline()
				.set(
					img,
					{
						opacity: 1,
						scale: 1,
						zIndex: zIndexVal,
						x: cacheMousePos.x - rect.width / 2,
						y: cacheMousePos.y - rect.height / 2,
						yPercent: 0
					},
					0
				)
				.to(
					img,
					{
						duration: 1.8,
						ease: 'expo.out',
						x: mousePos.x - rect.width / 2,
						y: mousePos.y - rect.height / 2
					},
					0
				)
				.to(
					img,
					{
						duration: 1.8,
						ease: 'power2.in',
						yPercent: 100,
						opacity: 0
					},
					0.8
				);
		}

		function render() {
			const moved = distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
			cacheMousePos.x = lastMousePos.x + (mousePos.x - lastMousePos.x) * 0.1;
			cacheMousePos.y = lastMousePos.y + (mousePos.y - lastMousePos.y) * 0.1;

			if (moved > threshold) {
				showNextImage();
				zIndexVal++;
				imgPosition = imgPosition < trailImgEls.length - 1 ? imgPosition + 1 : 0;
				lastMousePos = { ...mousePos };
			}

			frame = requestAnimationFrame(render);
		}

		frame = requestAnimationFrame(render);
		return () => cancelAnimationFrame(frame);
	});

	// enough laps to always cover the viewport at any wrap offset, so the loop never visibly runs out
	const laps = $derived(
		linkedTalents.length > 0 && lapHeight > 0 ? Math.max(2, Math.ceil(columnHeight / lapHeight) + 1) : 2
	);
	const extraLaps = $derived(Array.from({ length: laps - 1 }));

	const wrap = (value: number, max: number) => ((value % max) + max) % max;
	const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

	// the page itself never scrolls (this slice is the whole viewport), so motion is self-driven:
	// a slow constant autoplay drift plus wheel/touch/pointer drag, both feeding the same smoothed target
	const autoplaySpeed = 0.02; // px per ms of idle drift
	const dragSpeed = 1; // wheel/touch/drag px -> scroll px, 1:1
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

	const columnY = $derived(lapHeight > 0 ? -wrap(scroll, lapHeight) : 0);
</script>

<section
	class="relative grid grid-cols-8 gap-4 w-screen mt-10"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="grid col-span-8 grid-cols-subgrid">
		<h1 class="sticky top-30 -mb-2.5 col-span-5 z-50 pointer-events-none">{slice.primary.title}</h1>
	</div>

	<div
		class="h-screen -top-40 -left-10 absolute grid grid-cols-8 overflow-hidden w-screen pr-5 cursor-grab select-none"
		role="presentation"
		bind:this={sectionEl}
		onmousemove={onTrailMouseMove}
		bind:clientHeight={columnHeight}
		onwheel={onWheel}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={releasePointer}
		onpointercancel={releasePointer}
	>
		<div class="flex flex-col gap-0 z-50 col-span-4 col-start-5" style="transform: translateY({columnY}px); will-change: transform;">
			<div class="flex flex-col z-50 gap-0" bind:clientHeight={lapHeight}>
				{#each linkedTalents as { talent, name }}
					<PrismicLink field={talent} class="block w-full text-right">
						<h2 class="uppercase whitespace-nowrap leading-none listTN">{name}</h2>
					</PrismicLink>
				{/each}
			</div>
			{#each extraLaps as _}
				<div class="flex flex-col z-50 gap-0">
					{#each linkedTalents as { talent, name }}
						<PrismicLink field={talent} class="block w-full text-right">
							<h2 class="uppercase whitespace-nowrap leading-none listTN">{name}</h2>
						</PrismicLink>
					{/each}
				</div>
			{/each}
		</div>

		{#each trailImages as image, i}
			<img
				bind:this={trailImgEls[i]}
				src={image.url}
				alt={image.alt}
				class="pointer-events-none absolute top-0 left-0 max-w-70 object-cover opacity-0 will-change-transform z-10"
				style="aspect-ratio: {image.ratio};"
			>
		{/each}
	</div>
</section>
