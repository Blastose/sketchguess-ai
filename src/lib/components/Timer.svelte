<script lang="ts">
	import { writable } from 'svelte/store';
	import Icon from './Icon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import type { Game } from '$lib/game/game';
	import { currentTimeLeft } from '$lib/game/game_state';

	export let game: Game;
	export let timeLeft: number;
	export let pauseDrawing: () => void;
	export let saveImage: () => void;

	export const resetTimer = () => {
		state = 'stopped';
		count = timeLeft;
		value.set(0);
		currentTimeLeft.set(count);
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
			currentTimeLeft.set(count);
			value.set(((timeLeft - count) / timeLeft) * 100);
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

	$: if (game.state === 'drawing') {
		resetTimer();
		startTimer();
	} else if (game.state === 'drawing_ended') {
		stopTimer();
	}

	$: if (count === 0) {
		count = timeLeft;
		value.set(0);
		pauseDrawing();
		saveImage();
		game.stopDrawing();
		game = game;
	}

	const value = writable(0);
</script>

<div class="flex gap-2 w-full justify-center">
	<div class="flex gap-4 items-center w-[75%]">
		<div class="flex gap-1 items-center">
			<Icon name="timerOutline" />
			<span class="whitespace-nowrap">{count}</span>
		</div>

		<ProgressBar {value} />
	</div>
</div>

<!-- {state}
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Restart</button> -->
