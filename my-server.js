import { handler } from './build/handler.js';
import express from 'express';
import tmi from 'tmi.js';
import WebSocket from 'ws';
import 'dotenv/config';

const app = express();
app.use(handler);
app.listen(3000, () => {
	console.log('listening on port 3000');
	console.log('http://localhost:3000');
});

const ws = new WebSocket('ws://localhost:8001');
ws.on('error', console.error);

const twitchChannel = process.env.TWITCH_CHANNEL ?? '';

const client = new tmi.Client({ channels: [twitchChannel] });
client.connect().catch(console.error);
client.on('message', (channel, tags, message) => {
	console.log(tags['display-name'], message);
	ws.send(message);
});
