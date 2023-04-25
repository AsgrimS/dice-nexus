<script lang="ts" context="module">
	export type DiceType = "D4" | "D6" | "D8" | "D12" | "D20";
</script>

<script lang="ts">
	import { T } from "@threlte/core";
	import { useGltf } from "@threlte/extras";
	import { RigidBody, AutoColliders } from "@threlte/rapier";
	import { derived } from "svelte/store";

	export let type: DiceType = "D6";
	export let position: [x: number, y: number, z: number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let linearVelocity: [number, number, number] = [0, 0, 0];
	export let angularVelocity: [number, number, number] = [0, 0, 0];

	const gltf = useGltf("/models/Dices.glb");

	const dice = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes[type]) return;
		return gltf.nodes[type];
	});
</script>

{#if $dice}
	<RigidBody {position} {rotation} {linearVelocity} {angularVelocity} type={"dynamic"}>
		<AutoColliders shape={"convexHull"} density={10}>
			<T.Mesh castShadow geometry={$dice.geometry} material={$dice.material} />
		</AutoColliders>
	</RigidBody>
{/if}
