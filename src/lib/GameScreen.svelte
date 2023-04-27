<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";

	import type { Player } from "@prisma/client";

	export let players: Player[];
</script>

<div class="w-full h-full p-1 grid grid-rows-[auto_64px]">
	<div class="flex items-center justify-center" />
	<div class="flex gap-3">
		{#each players as player}
			<Avatar initials={player.name} background="bg-primary-500" />
		{/each}
	</div>
</div>
