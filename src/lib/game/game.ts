import { Leaderboard } from './leaderboard';
import { words } from './words';

export class Game {
	timer: number;
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
		this.roundWinner = { username: undefined, word: this.currentWord };
	}

	reset() {
		this.words = words.map((w) => w);
		this.currentWord = this.pickWord();
		this.leaderboard = new Leaderboard();
		this.roundWinner = { username: undefined, word: this.currentWord };
		this.round = 1;
		this.state = 'start_screen';
		console.log(this.currentWord);
	}

	startDrawing() {
		this.state = 'drawing';
	}

	stopDrawing() {
		this.state = 'drawing_ended';
	}

	nextRound() {
		this.round++;
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

export function generateWordHint(word: string) {
	const wordLength = word.length;
	const hintLettersCount = Math.ceil(wordLength / 4);

	const revealedPositions = new Set<number>();
	while (revealedPositions.size < hintLettersCount) {
		const position = Math.floor(Math.random() * wordLength);
		revealedPositions.add(position);
	}

	let hintWord = '';
	for (let i = 0; i < wordLength; i++) {
		if (revealedPositions.has(i)) {
			hintWord += word[i];
		} else {
			if (word[i] === ' ') {
				hintWord += word[i];
			} else {
				hintWord += '_';
			}
		}
	}

	return hintWord;
}
