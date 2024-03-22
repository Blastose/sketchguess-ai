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

	$: console.log(game.currentWord);
</script>

<div class="drawingarea-container">
	<div class="flex whitespace-nowrap">
		<p><Icon class="inline" name="pencil" /> Round: {game.round}/{game.maxRounds}</p>
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

		<p class="invisible">
			<Icon class="inline" name="pencil" /> Round: {game.round}/{game.maxRounds}
		</p>
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
