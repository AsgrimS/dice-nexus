<script lang="ts">
	import GameBar from "$lib/GameBar.svelte";
	import { AppShell } from "@skeletonlabs/skeleton";

	import type { PageData } from "./$types";

	export let data: PageData;
	console.log(data);
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<svelte:fragment slot="sidebarRight">
		<div class="h-full border-l-4 border-surface-400">
			<GameBar gameId={data.gameId} />
		</div>
	</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
