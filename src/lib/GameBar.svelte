<script lang="ts">
	import { popup } from "@skeletonlabs/skeleton";
	import IconDoor from "~icons/ph/door";

	import type { PopupSettings } from "@skeletonlabs/skeleton";

	export let gameName: string;

	let popupSettings: PopupSettings = {
		event: "hover",
		target: "exitPopup",
	};
</script>

<div class="card p-2 variant-filled-tertiary" data-popup="exitPopup">Exit game.</div>

<div class="bg-surface-800 h-full w-80 grid grid-rows-[100px_auto_300px]">
	<div class="border-b-4 border-surface-400 variant-filled-surface grid grid-cols-[5fr_1fr]">
		<h2 class="m-1">{gameName}</h2>
		<a href="/">
			<button class="btn variant-filled-tertiary m-5" use:popup={popupSettings}>
				<IconDoor class="text-[2em]" />
			</button>
		</a>
	</div>
	<div />
	<div class="m-0 variant-filled-surface border-t-4 border-surface-400 flex flex-col" />
</div>
