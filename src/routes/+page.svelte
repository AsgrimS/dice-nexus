<script lang="ts">
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { navigating } from "$app/stores";

	let gameId = "";
	let gameHref: string;
	let joinButtonEnabled = false;
	let buttonWidth = "w-32";

	$: gameHref = `/game/${gameId}/`;
	$: joinButtonEnabled = !!gameId && !!parseInt(gameId) && !$navigating;
	$: buttonWidth = $navigating ? "w-16" : "w-32";
</script>

<div class="w-screen h-screen flex justify-center mt-44">
	<div class="card p-4 w-56 h-40 flex flex-col  items-center">
		<label class="label">
			<span>Game ID</span>
			<input class="input" type="text" placeholder="Number" maxlength="3" bind:value={gameId} />
		</label>
		<a href={gameHref} class="mt-auto" data-sveltekit-preload-data={"tap"}>
			<button class="btn variant-filled {buttonWidth}" disabled={!joinButtonEnabled}>
				{#if $navigating}
					<ProgressRadial width={"w-6"} />
				{:else}
					Join room
				{/if}
			</button>
		</a>
	</div>
</div>
