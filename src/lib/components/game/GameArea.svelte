<script lang="ts">
	import type { Game } from '$lib/game/game';
	import Icon from '$lib/components/Icon.svelte';
	import Drawingarea from './Drawingarea.svelte';
	import RoundEnd from './RoundEnd.svelte';
	import GameOver from './GameOver.svelte';

	export let game: Game;
	let src = '';
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
		<h2 class="font-bold text-4xl">SketchGuessAI</h2>

		<button
			on:click={() => {
				game.startDrawing();
				game = game;
			}}
			class="pl-6 pr-8 py-4 flex gap-8 items-center text-3xl font-bold bg-blue-500 hover:bg-blue-600 rounded-md text-white"
			><Icon name="play" height="64" width="64" />Start game</button
		>
	</div>
{/if}
