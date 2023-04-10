<script lang="ts">
	import { T } from "@threlte/core";
	import { RigidBody, AutoColliders } from "@threlte/rapier";

	import type { ColorRepresentation } from "three";

	export let type: string;
	export let position: [x: number, y: number, z: number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let color: ColorRepresentation = "#808080";
	export let linearVelocity: [number, number, number] = [0, 0, 0];
	export let angularVelocity: [number, number, number] = [0, 0, 0];
</script>

<RigidBody {position} {rotation} {linearVelocity} {angularVelocity} type={"dynamic"}>
	<AutoColliders shape={"convexHull"} density={10}>
		<T.Mesh castShadow>
			{#if type === "D6"}
				<T.BoxGeometry />
			{:else if type === "D8"}
				<T.OctahedronGeometry />
			{:else if type === "D12"}}
				<T.DodecahedronGeometry />
			{:else if type === "D20"}
				<T.IcosahedronGeometry />
			{/if}
			<T.MeshStandardMaterial {color} />
		</T.Mesh>
	</AutoColliders>
</RigidBody>
