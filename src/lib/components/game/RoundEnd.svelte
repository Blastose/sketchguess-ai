<script lang="ts">
	import type { Game } from '$lib/game/game';
	import { settings } from '$lib/game/settings';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let game: Game;
	export let roundWinner: { username: string | undefined; word: string };
	export let src: string;

	let count = 10;
	let timer = setInterval(function () {
		count--;
		if (count === -1) {
			clearInterval(timer);
			if (!$settings.autoplay) {
				return;
			}
			game.nextRound();
			game = game;
		}
	}, 1000);

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<div class="" use:melt={$portalled}>
	{#if true}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            p-6 shadow-lg"
			transition:fly={{
				duration: 150,
				y: 8
			}}
			use:melt={$content}
		>
			<div class="flex flex-col gap-8">
				{#if roundWinner.username}
					<h2 class="font-bold text-3xl">{roundWinner.username} guessed it!</h2>
				{:else}
					<h2 class="font-bold text-3xl">No one guessed the word!</h2>
				{/if}
				<img class="max-h-[350px] object-contain" {src} alt="" />

				<p class="text-lg">The word was <span class="font-bold">{roundWinner.word}</span></p>

				<div class="flex items-center justify-center">
					<button
						class="flex flex-col gap-1 items-center bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-md text-white font-bold text-lg"
						on:click={() => {
							game.nextRound();
							game = game;
						}}
					>
						{#if $settings.autoplay}
							<span>Continuing in {count} seconds...</span>
							<span class="text-sm opacity-75">Or click to continue</span>
						{:else}
							<span>Continue</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
