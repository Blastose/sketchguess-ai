<script lang="ts">
	import type { Game } from '$lib/game/game';
	import Icon from '$lib/components/Icon.svelte';
	import Drawingarea from './Drawingarea.svelte';

	export let game: Game;
	let state: string = '';
</script>

{#if state}
	<Drawingarea bind:game />
{:else}
	<div class="w-full h-full flex gap-8 flex-col items-center justify-center">
		<h2 class="font-bold text-4xl">SketchGuessAI</h2>

		<button
			on:click={() => {
				state = 'askdfj';
			}}
			class="pl-6 pr-8 py-4 flex gap-8 items-center text-3xl font-bold bg-blue-500 hover:bg-blue-600 rounded-md text-white"
			><Icon name="play" height="64" width="64" />Start game</button
		>
	</div>
{/if}
