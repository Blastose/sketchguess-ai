<script lang="ts">
	import { createProgress, melt } from '@melt-ui/svelte';
	import { type Writable } from 'svelte/store';

	export let value: Writable<number>;

	const {
		elements: { root },
		options: { max }
	} = createProgress({
		value,
		max: 100
	});
</script>

<div use:melt={$root} class="relative h-2 w-full overflow-hidden rounded-[99999px] bg-black/20">
	<div
		class="h-full w-full bg-blue-500 transition-transform duration-[660ms]
        ease-[cubic-bezier(0.65,0,0.35,1)]"
		style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}
	/>
</div>
