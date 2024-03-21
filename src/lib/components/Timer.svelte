<script lang="ts">
	export let timeLeft: number;
	export const resetTimer = () => {
		state = 'stopped';
		count = timeLeft;
	};
	export const stopTimer = () => {
		state = 'stopped';
		clearInterval(timer);
	};
	export const startTimer = () => {
		state = 'playing';

		timer = setInterval(function () {
			count--;
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
</script>

{count}

{state}
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Restart</button>
