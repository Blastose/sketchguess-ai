<script lang="ts">
	import { Game } from '$lib/game/game';
	import Chat from './Chat.svelte';
	import GameArea from './game/GameArea.svelte';
	import Leaderboard from './Leaderboard.svelte';

	let game: Game = new Game();

	let g = false;
</script>

<main class="layout">
	<header class="header text-3xl font-bold flex items-center">SketchGuessAI</header>
	<section class="leaderboard ring ring-black rounded-md p-2"><Leaderboard bind:game /></section>
	<section class="chat ring ring-black rounded-md p-2">
		<Chat bind:game />
	</section>
	<section class="drawingarea ring ring-black rounded-md p-2">
		<GameArea bind:game />
	</section>
</main>

<style style="postcss">
	.layout {
		display: grid;
		grid-template-areas:
			'header header'
			'leaderboard drawingarea'
			'chat drawingarea';
		grid-template-columns: 256px 1fr;
		grid-template-rows: min-content 1fr 2fr;
		height: 100dvh;
		padding: 1rem;
		gap: 1rem;
	}

	.header {
		grid-area: header;
	}

	.leaderboard {
		grid-area: leaderboard;
		background-color: white;
		overflow: hidden;
	}

	.chat {
		grid-area: chat;
		background-color: white;
		overflow: hidden;
	}

	.drawingarea {
		grid-area: drawingarea;
		background-color: white;
	}
</style>
