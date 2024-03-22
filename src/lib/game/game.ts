import { Leaderboard } from './leaderboard';

const words = ['bird', 'cat', 'crab', 'kangaroo', 'penguin', 'rabbit', 'sea_turtle', 'spider'];

export class Game {
	timer: number;
	timeLeft: number;
	words: string[];
	currentWord: string;
	leaderboard: Leaderboard;
	round: number;
	maxRounds: number;
	roundWinner: { username: string | undefined; word: string };
	state: 'start_screen' | 'picking_word' | 'countdown' | 'drawing' | 'drawing_ended' | 'game_over' =
		'start_screen';

	constructor(timer: number = 60, maxRounds: number = 10) {
		this.timer = timer;
		this.words = words.map((w) => w);
		this.currentWord = this.pickWord();
		this.leaderboard = new Leaderboard();
		this.round = 1;
		this.maxRounds = maxRounds;
		this.timeLeft = timer;
		this.roundWinner = { username: undefined, word: this.currentWord };
	}

	reset() {
		this.words = words.map((w) => w);
		this.currentWord = this.pickWord();
		this.leaderboard = new Leaderboard();
		this.roundWinner = { username: undefined, word: this.currentWord };
		this.round = 1;
		this.timeLeft = this.timer;
		this.state = 'start_screen';
		console.log(this.currentWord);
	}

	start() {
		this.state = 'drawing';
	}

	nextRound() {
		this.round++;
		this.timeLeft = this.timer;
		this.pickWord();
		this.roundWinner = { username: undefined, word: this.currentWord };
		if (this.round > this.maxRounds) {
			this.round = this.maxRounds;
			this.state = 'game_over';
		} else {
			this.state = 'drawing';
		}
	}

	pickWord() {
		const word = this.words.splice(Math.floor(Math.random() * this.words.length), 1);
		this.currentWord = word.at(0)?.replaceAll('_', ' ') ?? 'Error';
		return this.currentWord;
	}

	guess(username: string, guess: string, timeLeft: number) {
		if (guess === this.currentWord) {
			this.leaderboard.addScore(username, timeLeft);
			this.roundWinner = { username, word: guess };
			this.state = 'drawing_ended';
			return true;
		}
		return false;
	}
}
