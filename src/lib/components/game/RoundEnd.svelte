<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let name: string;
	export let word: string;
	export let src: string;
</script>

<div class="" use:melt={$portalled}>
	{#if true}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            p-6 shadow-lg"
			transition:fly={{
				duration: 150,
				y: 8
			}}
			use:melt={$content}
		>
			<div class="flex flex-col gap-8">
				<h2 class="font-bold text-3xl">{name} guessed it!</h2>

				<img {src} alt="" />

				<p>The word was {word}</p>
				<div class="flex items-center justify-center">
					<button
						class="bg-blue-500 hover:bg-blue-600 px-8 py-2 rounded-md text-white font-bold text-lg"
						on:click={() => {}}>Continue</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
