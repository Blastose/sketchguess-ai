import { persisted } from 'svelte-persisted-store';

export const settings = persisted('settings-v1', {
	rounds: 10,
	timer: 60,
	autoplay: true,
	twitchChannel: 'twitch'
});
