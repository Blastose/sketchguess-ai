<script lang="ts">
	import GameOver from '$lib/components/game/GameOver.svelte';
	import { Game } from '$lib/game/game';

	const game = new Game();
	game.leaderboard.addScore('jimmy', 123);
	game.leaderboard.addScore('jimmy2', 53);
	game.leaderboard.addScore('jimmy3', 43);
	game.leaderboard.addScore('jimmy4', 23);
</script>

<GameOver {game} />
