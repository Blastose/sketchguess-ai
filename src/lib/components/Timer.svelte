<script lang="ts">
	import { writable } from 'svelte/store';
	import Icon from './Icon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import type { Game } from '$lib/game/game';

	export let game: Game;
	export let timeLeft: number;
	export const resetTimer = () => {
		state = 'stopped';
		count = timeLeft;
		clearInterval(timer);
	};
	export const stopTimer = () => {
		state = 'stopped';
		clearInterval(timer);
	};
	export const startTimer = () => {
		state = 'playing';

		clearInterval(timer);
		timer = setInterval(function () {
			count--;
			game.timeLeft = count;
			game = game;
			value.set(timeLeft - count);
			if (count === -1) {
				state = 'finished';
				clearInterval(timer);
				count = 0;
			}
		}, 1000);
	};

	let count = timeLeft;
	let state: 'stopped' | 'playing' | 'finished' = 'stopped';
	let timer: ReturnType<typeof setInterval>;

	const value = writable(0);
</script>

<div class="flex gap-2 items-center justify-center">
	<div class="flex gap-4 items-center w-[60%]">
		<div class="flex gap-1 items-center">
			<Icon name="timerOutline" />
			<span class="whitespace-nowrap">{count}</span>
		</div>

		<ProgressBar {value} />
	</div>
</div>

{state}
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Restart</button>
