<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import { SketchRNN } from '@magenta/sketch';
	import type { LSTMState } from '@magenta/sketch/es5/sketch_rnn/model';
	import { onMount } from 'svelte';

	let stop = false;
	const sketch = function (p: any) {
		let modelState: LSTMState; // Store the hidden states of rnn's neurons.
		const temperature = 0.45; // Controls the amount of uncertainty of the model.
		let modelLoaded = false;
		let drawingState: 'drawing' | 'paused' | 'startPause' = 'drawing';
		let waitTill = new Date();

		let dx: number, dy: number; // Offsets of the pen strokes, in pixels.
		let x: number, y: number; // Absolute coordinates on the screen of where the pen is.
		let pen = [0, 0, 0]; // Current pen state, [pen_down, pen_up, pen_end].
		let previousPen = [1, 0, 0]; // Previous pen state.
		const PEN = { DOWN: 0, UP: 1, END: 2 };

		// Load the model.
		const model = new SketchRNN('http://localhost:5173/data/crab.gen.json');

		/*
		 * Main p5 code
		 */
		p.setup = function () {
			const containerSize = document.getElementById('sketch')!.getBoundingClientRect();
			// Initialize the canvas.
			const screenWidth = Math.floor(containerSize.width);
			const screenHeight = Math.floor(containerSize.height);
			p.createCanvas(screenWidth, screenHeight);
			p.frameRate(24);

			model.initialize().then(function () {
				// Initialize the scale factor for the model. Bigger -> large outputs
				model.setPixelFactor(3.0);
				modelLoaded = true;
				restart();
				console.log('SketchRNN model loaded.');
			});
		};

		// Drawing loop.
		p.draw = function () {
			if (!modelLoaded || stop) {
				return;
			}

			// If we finished the previous drawing, start a new one.
			if (previousPen[PEN.END] === 1) {
				restart();
			}

			// New state.
			if (drawingState === 'startPause') {
				let seconds = Math.random();
				waitTill = new Date(new Date().getTime() + seconds * 1000);
				drawingState = 'paused';
			} else if (drawingState === 'paused') {
				if (waitTill < new Date()) {
					drawingState = 'drawing';
				}
			} else {
				[dx, dy, ...pen] = sampleNewState();
				// Only draw on the paper if the pen is still touching the paper.
				if (previousPen[PEN.DOWN] == 1) {
					p.line(x, y, x + dx, y + dy); // Draw line connecting prev point to current point.
				} else {
					drawingState = 'startPause';
				}

				// Update the absolute coordinates from the offsets
				x += dx;
				y += dy;

				// Update the previous pen's state to the current one we just sampled.
				previousPen = pen;
			}
		};

		/*
		 * Helpers.
		 */
		function sampleNewState() {
			// Using the previous pen states, and hidden state, get next hidden state
			// the below line takes the most CPU power, especially for large models.
			modelState = model.update([dx, dy, ...pen], modelState);

			// Get the parameters of the probability distribution (pdf) from hidden state.
			const pdf = model.getPDF(modelState, temperature);

			// Sample the next pen's states from our probability distribution.
			return model.sample(pdf);
		}

		function setupNewDrawing() {
			p.background(255, 255, 255, 255);
			x = p.width / 2.25;
			y = p.height / 2.25;
			const lineColor = p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224));

			p.strokeWeight(3.0);
			p.stroke(lineColor);
		}

		function restart() {
			[dx, dy, ...pen] = model.zeroInput(); // Reset the pen state.
			modelState = model.zeroState(); // Reset the model state.
			setupNewDrawing();
		}
	};

	onMount(async () => {
		const p5 = (await import('p5')).default;

		//@ts-expect-error
		new p5(sketch, 'sketch');
		const websocket = new WebSocket('ws://localhost:8001/'); // Listen for messages from the WebSocket connection

		websocket.addEventListener('message', ({ data }) => {
			const event = JSON.parse(data);
			console.log(event);
			if (event === 'quit') {
				stop = true;
			} else if (event === 'start') {
				stop = false;
			}
		});
	});
</script>

<div class="l">
	<div>
		<h1>Sketch Generation</h1>
		<p>This demo loads the <code>bird</code> SketchRNN model and generates bird sketches.</p>

		<Timer timeLeft={2} />
	</div>

	<div id="sketch"></div>
</div>

<style>
	.l {
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
	}
</style>
