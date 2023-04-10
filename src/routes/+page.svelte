<script lang="ts">
	import TableScene from "../lib/render/TableScene.svelte";

	let tableScene: TableScene;
</script>

<div class="w-screen h-screen">
	<div class="w-full h-3/4 border-2 border-slate-500">
		<TableScene bind:this={tableScene} />
		<button
			type="button"
			class="btn variant-filled"
			on:click={() => {
				tableScene.spawnDice();
			}}
		>
			Spawn Dice
		</button>
	</div>
</div>
