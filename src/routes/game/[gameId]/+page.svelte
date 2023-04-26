<script lang="ts">
	import GameBar from "$lib/GameBar.svelte";
	import GameScreen from "$lib/GameScreen.svelte";
	import { AppShell } from "@skeletonlabs/skeleton";

	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<svelte:fragment slot="sidebarRight">
		<div class="h-full border-l-4 border-surface-400">
			<GameBar gameName={data.gameName} />
		</div>
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<GameScreen players={data.players} />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
