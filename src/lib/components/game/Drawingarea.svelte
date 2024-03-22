<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import type { Game } from '$lib/game/game';
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
</script>

<div class="drawingarea-container">
	<div>
		<div class="flex gap-2">
			<Icon name="pencil" />
			<p>Round: {game.round}/{game.maxRounds} - {game.state}</p>
			<button
				on:click={() => {
					pauseDrawing();
					src = saveImage();
					game.state = 'drawing_ended';
					// game.nextRound();
					game = game;
				}}>Next round</button
			>
		</div>

		<div>
			Current word: {game.currentWord}
		</div>

		<Timer
			timeLeft={60}
			bind:game
			{pauseDrawing}
			saveImage={() => {
				src = saveImage();
			}}
			{startTimer}
			{resetTimer}
			{stopTimer}
		/>
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
