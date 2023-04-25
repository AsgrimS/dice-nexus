<script lang="ts">
	import TableScene from "$lib/render/TableScene.svelte";

	export let gameId = "";

	let tableScene: TableScene;
</script>

<div class="bg-surface-800 h-full w-80 grid grid-rows-[auto_300px]">
	<div>
		<h1>Game: {gameId}</h1>
	</div>
	<div class="m-0 variant-filled-secondary border-t-4 border-surface-400 flex flex-col">
		<button class="btn variant-filled-primary m-3 " on:click={tableScene.spawnDice}>
			Spawn Dice
		</button>
		<div class="border-b-4 border-surface-400" />
		<div class="h-full">
			<TableScene bind:this={tableScene} />
		</div>
	</div>
</div>
