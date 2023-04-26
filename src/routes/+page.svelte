<script lang="ts">
	let gameId = "";
	let gameHref: string;

	$: gameHref = `/game/${gameId}/`;
</script>

<div class="w-screen h-screen flex justify-center mt-44">
	<div class="card p-4 w-56 h-40 flex flex-col  items-center">
		<label class="label">
			<span>Game ID</span>
			<input class="input" type="text" placeholder="Number" maxlength="3" bind:value={gameId} />
		</label>
		{#if gameId && parseInt(gameId)}
			<a href={gameHref} class="mt-auto">
				<button class="btn variant-filled">Join room {gameId}</button>
			</a>
		{/if}
	</div>
</div>
