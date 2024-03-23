<script lang="ts">
	import type { Game } from '$lib/game/game';
	import Icon from '$lib/components/Icon.svelte';
	import Drawingarea from './Drawingarea.svelte';
	import RoundEnd from './RoundEnd.svelte';
	import GameOver from './GameOver.svelte';
	import { settings } from '$lib/game/settings';

	export let game: Game;
	let src = '';

	function handleRoundChange(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		settings.update((s) => ({ ...s, rounds: Number(e.currentTarget.value) }));
	}

	function handleTimerChange(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		settings.update((s) => ({ ...s, timer: Number(e.currentTarget.value) }));
	}

	let timeout: ReturnType<typeof setTimeout>;
	function handleTwitchChannelInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const target = e.target as EventTarget & { value: string };
			settings.update((s) => ({ ...s, twitchChannel: target.value }));
		}, 500);
	}
</script>

{#if game.state !== 'start_screen'}
	<Drawingarea bind:game bind:src />
	{#if game.state === 'picking_word'}
		<p>Neuro is choosing a word...</p>
	{:else if game.state === 'game_over'}
		<GameOver bind:game />
	{/if}
	{#if game.state === 'drawing_ended'}
		<RoundEnd bind:game {src} roundWinner={game.roundWinner} />
	{/if}
{:else}
	<div class="w-full h-full flex gap-8 flex-col items-center justify-center">
		<h2 class="font-bold text-4xl flex items-center gap-2">
			<Icon width="36" height="36" name="paletteOutline" />SketchGuessAI
		</h2>

		<div class="flex justify-center items-center flex-col gap-4">
			<div class="flex flex-wrap gap-8">
				<label class="flex gap-2 items-center">
					<span class="flex items-center gap-1"><Icon name="refresh" />Number of rounds:</span>
					<select
						class="dropdown ring-2 ring-blue-500 focus:outline-none focus:ring"
						name="rounds"
						on:change={handleRoundChange}
					>
						{#each { length: 10 } as _, index}
							<option selected={index + 1 === $settings.rounds} value={index + 1}
								>{index + 1} rounds</option
							>
						{/each}
					</select>
				</label>

				<label class="flex gap-2 items-center">
					<span class="flex items-center gap-1"><Icon name="timerOutline" />Timer length:</span>
					<select
						class="dropdown ring-2 ring-blue-500 focus:outline-none focus:ring"
						name="timer"
						on:change={handleTimerChange}
					>
						{#each { length: 6 } as _, index}
							<option selected={(index + 1) * 10 === $settings.timer} value={(index + 1) * 10}
								>{(index + 1) * 10} seconds</option
							>
						{/each}
					</select>
				</label>

				<label class="flex gap-2 items-center">
					<span class="flex items-center gap-1"><Icon name="play" />Autoplay rounds: </span>
					<input class="accent-blue-500" bind:checked={$settings.autoplay} type="checkbox" />
				</label>
			</div>

			<label class="flex gap-2 items-center">
				<span class="flex items-center gap-1"><Icon name="commentOutline" />Twitch Channel:</span>
				<input
					class="ring-2 ring-blue-500 rounded-md focus:outline-none focus:ring px-2 py-1"
					value={$settings.twitchChannel}
					on:input={handleTwitchChannelInput}
				/>
			</label>
		</div>

		<button
			on:click={() => {
				game.startDrawing();
				game = game;
			}}
			class="pl-6 pr-8 py-2 duration-300 flex gap-8 items-center text-3xl font-bold bg-blue-500 hover:bg-blue-600 rounded-md text-white"
			><Icon name="play" height="64" width="64" />Start game</button
		>
	</div>
{/if}

<style>
	.dropdown {
		border-radius: 0.375rem;
		padding: 0 2rem 0 0.125rem;
	}
</style>
