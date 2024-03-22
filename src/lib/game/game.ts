import { Leaderboard } from './leaderboard';

const words = ['bird', 'cat', 'crab'];

export class Game {
	timer: number;
	timeLeft: number;
	words: string[];
	currentWord: string;
	leaderboard: Leaderboard;
	round: number;
	maxRounds: number;

	constructor(timer: number = 60, maxRounds: number = 10) {
		this.timer = timer;
		this.words = words;
		this.currentWord = words[0];
		this.leaderboard = new Leaderboard();
		this.round = 1;
		this.maxRounds = maxRounds;
		this.timeLeft = timer;
		this.reset();
	}

	reset() {
		this.words = words;
		this.currentWord = words[0];
		this.leaderboard = new Leaderboard();
		this.round = 1;
		this.timeLeft = this.timer;
		console.log(this.currentWord);
	}

	nextRound() {
		this.round++;
		this.timeLeft = this.timer;
		this.pickWord();
	}

	pickWord() {
		const word = this.words.splice(Math.floor(Math.random() * this.words.length), 1);
		this.currentWord = word[0];
	}

	guess(username: string, guess: string, timeLeft: number) {
		if (guess === this.currentWord) {
			this.leaderboard.addScore(username, timeLeft);
			return true;
		}
		return false;
	}
}
