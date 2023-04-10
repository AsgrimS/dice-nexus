<script lang="ts">
	import GameBar from "$lib/GameBar.svelte";
	import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<svelte:fragment slot="sidebarRight"
		><div class="h-full border-l-4 border-surface-400"><GameBar /></div></svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
