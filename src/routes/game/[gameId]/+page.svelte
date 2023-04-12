<script lang="ts">
	import GameBar from "$lib/GameBar.svelte";
	import TableScene from "$lib/render/TableScene.svelte";
	import { AppShell } from "@skeletonlabs/skeleton";

	import type { PageData } from "./$types";

	export let data: PageData;

	let tableScene: TableScene;
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<svelte:fragment slot="sidebarRight">
		<div class="h-full border-l-4 border-surface-400">
			{#if tableScene}
				<GameBar gameId={data.gameId} spawnDice={tableScene.spawnDice} />
			{:else}
				<h1>Loading...</h1>
			{/if}
		</div>
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<TableScene bind:this={tableScene} />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
