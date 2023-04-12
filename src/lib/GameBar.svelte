<script lang="ts">
	export let gameId = "";
	export let spawnDice: () => void;
</script>

<div class="bg-surface-800 h-full w-80">
	<h1>Game: {gameId}</h1>
	<button class="btn variant-filled-primary m-3" on:click={spawnDice}>Spawn Dice</button>
</div>
