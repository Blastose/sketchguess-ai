<script lang="ts">
	import { SketchRNN } from '@magenta/sketch';
	import type { LSTMState } from '@magenta/sketch/es5/sketch_rnn/model';
	import { onMount } from 'svelte';
	import p5 from 'p5';

	let dx: number, dy: number; // offsets of the pen strokes, in pixels
	let pen_down: number, pen_up: number, pen_end: number; // keep track of whether pen is touching paper
	let x: number, y: number; // absolute coordinates on the screen of where the pen is
	let prev_pen = [1, 0, 0]; // group all p0, p1, p2 together
	let rnn_state: LSTMState; // store the hidden states of rnn's neurons
	let pdf; // store all the parameters of a mixture-density distribution
	let temperature = 0.45; // controls the amount of uncertainty of the model
	let line_color;
	let model_loaded = false;

	// loads the TensorFlow.js version of sketch-rnn model, with the "cat" model's weights.
	const model = new SketchRNN(
		'https://storage.googleapis.com/quickdraw-models/sketchRNN/models/cat.gen.json'
	);
	// code that ensures the above line is run before the below lines are run.

	console.log(model);

	onMount(async () => {
		await model.initialize();
		new p5((p) => {
			p.a;
		}, canvas);
		setup();
		draw();
		console.log(model);
		draw();
		draw();
		draw();
		draw();
	});

	function setup() {
		// x = windowWidth / 2.0;
		// y = windowHeight / 3.0;
		// createCanvas(windowWidth, windowHeight);
		// frameRate(60);

		// Initialize the scale factor for the model. Bigger -> large outputs.
		model.setPixelFactor(3.0);
		// Initialize pen's states to zero.
		[dx, dy, pen_down, pen_up, pen_end] = model.zeroInput(); // The pen's states.

		// Zero out the rnn's initial states.
		rnn_state = model.zeroState();

		// Define color of line.
		// line_color = color(random(64, 224), random(64, 224), random(64, 224));
	}

	function draw() {
		// See if we finished drawing.
		if (prev_pen[2] == 1) {
			// noLoop(); // Stop drawing.
			return;
		}

		// Using the previous pen states, and hidden state, get next hidden state
		// the below line takes the most CPU power, especially for large models.

		rnn_state = model.update([dx, dy, pen_down, pen_up, pen_end], rnn_state);

		// Get the parameters of the probability distribution (pdf) from hidden state.
		pdf = model.getPDF(rnn_state, temperature);

		// Sample the next pen's states from our probability distribution.
		[dx, dy, pen_down, pen_up, pen_end] = model.sample(pdf);

		// Only draw on the paper if the pen is touching the paper.
		if (prev_pen[0] == 1) {
			// stroke(line_color);
			// strokeWeight(3.0);
			// line(x, y, x + dx, y + dy); // Draw line connecting prev point to current point.
			console.log(x, y);
		}

		// Update the absolute coordinates from the offsets
		x += dx;
		y += dy;

		// Update the previous pen's state to the current one we just sampled
		prev_pen = [pen_down, pen_up, pen_end];
	}

	let canvas: HTMLCanvasElement;
</script>

<h1>Sketch Generation</h1>
<p>This demo loads the bird SketchRNN model and generates bird sketches.</p>

<canvas id="sketch" bind:this={canvas}></canvas>
