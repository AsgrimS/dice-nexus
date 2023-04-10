// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module "~icons/*" {
	import { SvelteComponentTyped } from "svelte";
	export default class extends SvelteComponentTyped<svelte.JSX.IntrinsicElements["svg"]> {}
}
