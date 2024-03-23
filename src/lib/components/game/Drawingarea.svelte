<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import { generateWordHint, type Game } from '$lib/game/game';
	import { currentTimeLeft } from '$lib/game/game_state';
	import Icon from '../Icon.svelte';
	import Canvas from './Canvas.svelte';

	export let game: Game;
	export let src: string;
	let startTimer: () => void;
	let stopTimer: () => void;
	let resetTimer: () => void;

	let saveImage: () => string;
	let pauseDrawing: () => string;

	$: if (game.state === 'drawing_ended' || game.state === 'game_over') {
		pauseDrawing();
		if (game.state === 'drawing_ended') {
			src = saveImage();
		}
	}

	$: console.log(game.currentWord);
</script>

<div class="drawingarea-container">
	<div class="flex flex-col">
		<div class="flex whitespace-nowrap">
			<p class="flex gap-2 items-center">
				<Icon name="pencil" /><span>Round: {game.round}/{game.maxRounds}</span>
			</p>
			<!-- <p>{game.state}</p> -->
			<!-- <button
				on:click={() => {
					pauseDrawing();
					src = saveImage();
					game.stopDrawing();
					game = game;
				}}>Next round</button
			> -->

			<Timer
				timeLeft={game.timer}
				bind:game
				{pauseDrawing}
				saveImage={() => {
					src = saveImage();
				}}
				{startTimer}
				{resetTimer}
				{stopTimer}
			/>

			<button
				on:click={() => {
					game.reset();
					game = game;
				}}
				class="flex gap-2 items-center ring-1 ring-blue-500 hover:bg-blue-50 rounded-md px-2"
			>
				<Icon name="close" />
				<span>Exit</span>
			</button>
		</div>

		<div class="flex justify-center text-lg">
			<div class="flex gap-1 {$currentTimeLeft < game.timer / 3 ? 'visible' : 'invisible'}">
				<!-- Display character hints -->
				{#each generateWordHint(game.currentWord) as l}<span>
						{#if l !== ' '}
							{l}
						{:else}
							<span class="invisible">__</span>
						{/if}
					</span>
				{/each}
				<sup class="top-[4px]">{game.currentWord.length}</sup>
			</div>
		</div>
	</div>

	{#key game.currentWord}
		<Canvas bind:game bind:saveImage bind:pauseDrawing />
	{/key}
</div>

<style>
	.drawingarea-container {
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
	}
</style>
