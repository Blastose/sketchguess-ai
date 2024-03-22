<script lang="ts">
	import { writable } from 'svelte/store';
	import Icon from './Icon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import type { Game } from '$lib/game/game';

	export let game: Game;
	export let timeLeft: number;
	export let pauseDrawing: () => void;
	export let saveImage: () => void;

	export const resetTimer = () => {
		state = 'stopped';
		count = timeLeft;
		value.set(0);
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
			console.log(count);
			value.set(((timeLeft - count) / timeLeft) * 100);
			if (count === -1) {
				state = 'finished';
				clearInterval(timer);
				count = 0;
			}
		}, 1000);
	};

	// TODO fix timer not resetting

	let count = timeLeft;
	let state: 'stopped' | 'playing' | 'finished' = 'stopped';
	let timer: ReturnType<typeof setInterval>;

	$: if (game.state === 'drawing') {
		startTimer();
	} else if (game.state === 'drawing_ended') {
		stopTimer();
	}

	$: if (count === 0) {
		count = timeLeft;
		value.set(0);
		pauseDrawing();
		saveImage();
		game.state = 'drawing_ended';
		game = game;
	}

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
