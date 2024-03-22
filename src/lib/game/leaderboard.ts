export class Leaderboard {
	scores: Map<string, number>;

	constructor() {
		this.scores = new Map();
	}

	reset(): void {
		this.scores = new Map();
	}

	addScore(username: string, points: number): void {
		const score = this.scores.get(username);
		this.scores.set(username, (score || 0) + points);
	}

	removeScore(username: string): boolean {
		return this.scores.delete(username);
	}

	getScore(username: string): number {
		return this.scores.get(username) || 0;
	}

	getLeaderboard() {
		const leaderboard = [];
		for (const [index, key] of Array.from(this.scores)
			.sort((a, b) => b[1] - a[1])
			.entries()) {
			leaderboard.push({ username: key[0], score: key[1] });
			if (index > 10) {
				break;
			}
		}
		return leaderboard;
	}
}
