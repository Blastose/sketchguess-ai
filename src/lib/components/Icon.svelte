<script lang="ts" context="module">
	export type IconType = keyof typeof icons;
	const icons = {
		close: {
			box: 24,
			svg: `<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>`
		},
		commentOutline: {
			box: 24,
			svg: `<path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" />`
		},
		starCircle: {
			box: 24,
			svg: `<path d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />`
		}
	};
</script>

<script lang="ts">
	export let name: IconType;
	export let width: string = '24';
	export let height: string = '24';
	export let hidden: boolean = true;
	let className: string = '';
	export { className as class };

	const icon = icons[name];
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="currentColor"
	aria-hidden={hidden}
	class={className}
	{width}
	{height}
	viewBox="0 0 {icon.box} {icon.box}"
>
	{@html icon.svg}
</svg>
