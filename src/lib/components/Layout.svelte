<script lang="ts">
	import { Game } from '$lib/game/game';
	import { settings } from '$lib/game/settings';
	import Chat from './Chat.svelte';
	import GameArea from './game/GameArea.svelte';
	import Leaderboard from './Leaderboard.svelte';

	let game: Game = new Game($settings.timer, $settings.rounds);

	$: if ($settings) {
		game.maxRounds = $settings.rounds;
		game.timer = $settings.timer;
		game = game;
	}
</script>

<div class="max-w-[1536px] mx-auto">
	<main class="layout">
		<header
			class="header text-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white flex items-center"
		>
			SketchGuessAI
		</header>
		<section class="leaderboard ring ring-blue-500 rounded-md p-2">
			<Leaderboard bind:game />
		</section>
		<section class="chat ring ring-blue-500 rounded-md p-2">
			<Chat bind:game />
		</section>
		<section class="drawingarea ring ring-blue-500 rounded-md p-4">
			<GameArea bind:game />
		</section>
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-areas:
			'header header'
			'leaderboard drawingarea'
			'chat drawingarea';
		grid-template-columns: 256px 1fr;
		grid-template-rows: min-content 1fr 2fr;
		height: 100dvh;
		padding: 2rem;
		gap: 2rem;
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
