<script lang="ts">
	import { tick } from 'svelte';
	import tmi from 'tmi.js';
	import Icon from './Icon.svelte';
	import type { Game } from '$lib/game/game';
	import { currentTimeLeft } from '$lib/game/game_state';
	import { settings } from '$lib/game/settings';

	export let game: Game;

	type ChatMessage = { username: string; message: string };

	let chats: ChatMessage[] = [
		// { username: 'user1', message: 'Hello, everyone!' },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" },
		// { username: 'user2', message: 'Hey there!' },
		// { username: 'user3', message: "What's up, chat?" },
		// { username: 'user4', message: "I'm new here, nice to meet you all!" },
		// { username: 'user5', message: "Let's have some fun!" }
	];

	let chatContainer: HTMLElement;
	const scrollToBottom = () => {
		chatContainer?.scroll({ top: chatContainer?.scrollHeight });
	};

	async function addChat(chatMessage: ChatMessage) {
		chats.push(chatMessage);
		chats = chats;

		if (chats.length > 100) {
			const newChats = chats.slice(50);
			chats = newChats;
		}
		await tick();
		scrollToBottom();
	}

	function connectTwitch(_: HTMLElement) {
		const client = new tmi.Client({ channels: [$settings.twitchChannel] });
		client.connect().catch(console.error);
		client.on('message', (_, tags, message) => {
			const username = tags['display-name'] ?? 'user';
			addChat({ username, message });

			if (game.state !== 'drawing') {
				return;
			}
			if (game.guess(username, message, $currentTimeLeft)) {
				game = game;
			}
		});
	}
</script>

<h2 class="font-bold text-lg">Chat</h2>
<div use:connectTwitch class="h-[calc(100%-28px)]">
	<div class="chat-container thin-scrollbar" bind:this={chatContainer}>
		{#each chats as chat}
			<div>
				<Icon class="inline" name="commentOutline" />
				<span class="text-blue-700">{chat.username}:</span>
				{chat.message}
			</div>
		{:else}
			<p class="italic">No messages so far</p>
		{/each}
	</div>
</div>

<!-- <button
	on:click={async () => {
		addChat({ username: 'user7', message: 'Hasdlfjlsfj' });
	}}>add chat</button
> -->

<style>
	.chat-container {
		overflow-y: auto;
		height: 100%;
	}
</style>
