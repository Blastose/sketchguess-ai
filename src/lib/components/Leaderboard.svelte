<script lang="ts">
	import type { Game } from '$lib/game/game';
	import Icon from './Icon.svelte';

	export let game: Game;

	// type Leaderboard = { username: string; score: number };
	// let scores: Leaderboard[] = [];
	// const usernames = ['user1', 'user2', 'user3', 'user4', 'user5'];
	// scores = usernames.map((username) => ({ username, score: Math.floor(Math.random() * 101) }));
</script>

<div class="flex flex-col gap-2 h-full">
	<h2 class="text-lg font-bold">Leaderboard</h2>

	<div class="flex flex-col gap-2">
		{#each game.leaderboard.getLeaderboard() as score}
			<div class="flex justify-between">
				<div class="font-bold">{score.username}</div>
				<div>
					<span class="font-bold text-blue-600">{score.score}</span>
					<Icon class="inline fill-yellow-500" name="starCircle" />
				</div>
			</div>
		{/each}
	</div>
</div>
