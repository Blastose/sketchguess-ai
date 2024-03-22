import { persisted } from 'svelte-persisted-store';

export const settings = persisted('settings', {
	rounds: 10,
	timer: 60,
	autoplay: true
});
