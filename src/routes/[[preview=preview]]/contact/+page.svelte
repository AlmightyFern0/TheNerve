<script lang="ts">
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  // — State —
  let step = $state(1);
  let formData = $state({
    name: '',
    email: '',
    pronouns: '',
    message: ''
  });
  let countdown = $state(30);
  let timer: ReturnType<typeof setInterval> | null = null;

  // — Derived —
  const totalSteps = 4;
  const progress = $derived((step / totalSteps) * 100);

  // — Validation helpers —
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canProceed = $derived(() => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return isValidEmail(formData.email);
    if (step === 3) return formData.pronouns.length > 0;
    if (step === 4) return formData.message.trim().length > 0;
    return false;
  });

  // — Navigation —
  function next() {
    if (step < totalSteps) {
      step++;
    } else {
      submit();
    }
  }

  function back() {
    if (step > 1) step--;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && canProceed()) next();
  }

  // — Submission —
    async function submit() {
    await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        pronouns: formData.pronouns,
        message: formData.message
        })
    });

    step = 5;
    startCountdown();
    }

  // — Countdown for thank-you screen —
  function startCountdown() {
    timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer!);
        goto('/');
      }
    }, 1000);
  }

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  import { fade } from 'svelte/transition';
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Progress bar (visible on steps 1–4) -->
{#if step <= totalSteps}
  <div class="fixed top-0 left-0 w-full h-1 bg-[#0A0A0A] z-50">
    <div
      class="h-full bg-white  transition-all duration-500 ease-out"
      style="width: {progress}%"
    ></div>
  </div>
{/if}

<main
  class="grid grid-cols-8 gap-y-20 w-screen max-w-375 -ml-10 overflow-hidden"
  role="main"
>
  <div class="col-span-8 grid grid-cols-subgrid">

    <!-- STEP 1 — Name -->
    {#if step === 1}
        <div class="col-span-8 grid grid-cols-subgrid" in:fade>
            <div class="col-span-6 col-start-2 mb-40">
                <h2 class="text-center">We listen and <br> we don't judge</h2>
            </div>
            <div class="col-span-4 col-start-3">
                <p><b class="cardTitle">Come ti chiami?</b></p>
                <input
                type="text"
                placeholder="Joanne"
                bind:value={formData.name}
                class="pb-0.5 pt-8.75 w-full border-b border-b-neutral-500 bg-transparent outline-none focus:border-b-white transition-colors placeholder:text-neutral-500 text-white"
                />
                <div class="flex justify-end">
                    <button
                        onclick={next}
                        disabled={!canProceed()}
                        class="-mt-8 text-2xl text-white disabled:opacity-30 hover:opacity-80 transition-opacity"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>

    <!-- STEP 2 — Email -->
    {:else if step === 2}
        <div class="col-span-8 grid grid-cols-subgrid" in:fade>
            <div class="col-span-6 col-start-2 mb-40">
                <h2 class="text-center">{formData.name}, beh... Particolare.</h2>
            </div>
            <div class="col-span-4 col-start-3">
                <p><b class="cardTitle">A che mail possiamo scriverti {formData.name}?</b></p>
                <input
                type="email"
                placeholder="joanne@mail.com"
                bind:value={formData.email}
                class="pb-0.5 pt-8.75 w-full border-b border-b-neutral-500 bg-transparent outline-none focus:border-b-white transition-colors placeholder:text-neutral-500 text-white"
                />
                <div class="flex justify-end">
                    <button
                        onclick={next}
                        disabled={!canProceed()}
                        class="-mt-8 text-2xl text-white disabled:opacity-30 hover:opacity-80 transition-opacity"
                    >
                        →
                    </button>
                </div>
                <button
                    onclick={back}
                    class="py-4 text-md text-neutral-500 hover:text-white disabled:opacity-30  transition-colors"
                >
                    ← Cambia il tuo nome
                </button>
            </div>
        </div>

    <!-- STEP 3 — Pronouns -->
    {:else if step === 3}
        <div class="col-span-8 grid grid-cols-subgrid" in:fade>
            <div class="col-span-6 col-start-2 mb-40">
                <h2 class="text-center">Scelta coraggiosa quella mail...</h2>
            </div>
            <div class="col-span-4 col-start-3">
                <p><b class="cardTitle">Hai dei pronomi preferiti {formData.name}?</b></p>
                <input
                type="text"
                placeholder="Lei/Loro oppure Maschili/Femminili"
                bind:value={formData.pronouns}
                class="pb-0.5 pt-8.75 w-full border-b border-b-neutral-500 bg-transparent outline-none focus:border-b-white transition-colors placeholder:text-neutral-500 text-white"
                />
                <div class="flex justify-end">
                    <button
                        onclick={next}
                        disabled={!canProceed()}
                        class="-mt-8 text-2xl text-white disabled:opacity-30 hover:opacity-80 transition-opacity"
                    >
                        →
                    </button>
                </div>
                <button
                    onclick={back}
                    class="py-4 text-md text-neutral-500 hover:text-white disabled:opacity-30  transition-colors"
                >
                    ← Cambia la tua mail
                </button>
            </div>
      </div>

    <!-- STEP 4 — Message -->
    {:else if step === 4}
        <div class="col-span-8 grid grid-cols-subgrid" in:fade>
            <div class="col-span-6 col-start-2 mb-40">
                <h2 class="text-center">Ma, esattamente... <br> Cosa vuoi?</h2>
            </div>
            <div class="col-span-4 col-start-3">
                <p><b class="cardTitle">Perché ci stai contattando?</b></p>
                <input
                type="text"
                placeholder="Dicci tutto amo ma sii breve... Tanto ti ricontatteremo."
                bind:value={formData.message}
                class="pb-0.5 pt-8.75 w-full bg-transparent outline-none transition-colors placeholder:text-neutral-500 text-white"
                />
                <div class="flex justify-end">
                    <button
                        onclick={next}
                        disabled={!canProceed()}
                        class="-mt-8 text-2xl text-white disabled:opacity-30 hover:opacity-80 transition-opacity"
                    >
                        →
                    </button>
                </div>
                <button
                    onclick={back}
                    class="py-4 text-md text-neutral-500 hover:text-white disabled:opacity-30  transition-colors"
                >
                    ← Sbagliato i pronomi?
                </button>
            </div>
      </div>

    <!-- STEP 5 — Thank you -->
    {:else if step === 5}
        <div class="col-span-8 grid grid-cols-subgrid" in:fade>
        <div class="col-span-6 col-start-2 mb-40">
            <h2 class="text-center">Le faremo <br> sapere...</h2>
        </div>
        <div class="col-span-4 col-start-3">
            <p class="text-white text-center"><b class="cardTitle">Grazie {formData.name}, ti ricontatteremo a {formData.email}</b></p>
            <p class="text-sm pt-4 text-center" style="color:#525252">
                Se non vieni reindirizzat* alla home in {countdown}s <a onclick={() => goto('/')} class="underline cursor-pointer" style="color:#525252">clicca qui</a>
            </p>
        </div>
    </div>
    {/if}

  </div>
</main>