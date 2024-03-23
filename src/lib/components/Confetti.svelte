<script lang="ts">
	import { ConfettiCannon } from 'svelte-canvas-confetti';

	export let particleCount: number | undefined = 50;
</script>

<ConfettiCannon
	{particleCount}
	origin={[window.innerWidth / 2, window.innerHeight]}
	angle={-90}
	spread={100}
	force={35}
/>
