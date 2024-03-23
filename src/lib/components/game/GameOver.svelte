<script lang="ts">
	import type { Game } from '$lib/game/game';
	import { onDestroy } from 'svelte';
	import Modal from './Modal.svelte';
	import { settings } from '$lib/game/settings';
	import Confetti from '../Confetti.svelte';

	export let game: Game;

	let count = 10;
	let timer = setInterval(function () {
		count--;
		if (count === -1) {
			clearInterval(timer);
			if (!$settings.autoplay) {
				return;
			}
			game.reset();
			game.state = 'drawing';
			game = game;
		}
	}, 1000);

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<Confetti particleCount={125} />
<Modal>
	<div class="flex flex-col gap-8">
		<div class="flex flex-col items-center justify-center gap-4">
			<h2 class="font-bold text-3xl">GAME OVER</h2>

			<div class="w-full max-w-96 bg-yellow-200 rounded-md px-6 pt-4 pb-6 flex flex-col gap-2">
				<h2 class="font-bold text-2xl">Rankings</h2>

				<div class="flex flex-col gap-2">
					{#each game.leaderboard.getLeaderboard() as score, index}
						<div class="flex justify-between text-lg font-bold">
							<div class="flex gap-4">
								<span>{index + 1}.</span>
								<span>{score.username}</span>
							</div>
							<div>{score.score}</div>
						</div>
					{:else}
						<p class="italic">None</p>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2 items-center justify-center">
			<button
				class="flex flex-col gap-1 items-center duration-300 bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-md text-white font-bold text-lg"
				on:click={() => {
					game.reset();
					game.state = 'drawing';
					game = game;
				}}
			>
				{#if $settings.autoplay}
					<span>Restarting in {count} seconds...</span>
					<span class="text-sm opacity-75">Or click to restart</span>
				{:else}
					<span>Restart</span>
				{/if}
			</button>

			<button
				class="flex flex-col gap-1 hover:bg-blue-100 duration-300 items-center px-8 py-2 rounded-md font-bold text-lg"
				on:click={() => {
					game.reset();
					game = game;
				}}
			>
				<span>Return to main menu</span>
			</button>
		</div>
	</div>
</Modal>
