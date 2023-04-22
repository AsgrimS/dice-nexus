<script lang="ts">
	import { T } from "@threlte/core";
	import { AutoColliders } from "@threlte/rapier";
	import { degToRad } from "three/src/math/MathUtils";

	const tableBordersOpts: Array<[number, [number, number, number]]> = [
		[90, [10, 1, 0]],
		[90, [-10, 1, 0]],
		[0, [0, 1, 10]],
		[0, [0, 1, -10]],
	];
</script>

<AutoColliders shape={"cuboid"}>
	<T.Mesh receiveShadow rotation.x={degToRad(-90)}>
		<T.BoxGeometry args={[20, 20, 0.1]} />
		<T.MeshStandardMaterial color="gray" />
	</T.Mesh>
	{#each tableBordersOpts as [rotationY, position]}
		<T.Mesh receiveShadow {position} rotation.y={degToRad(rotationY)}>
			<T.BoxGeometry args={[20, 2, 0.1]} />
			<T.MeshStandardMaterial color="gray" />
		</T.Mesh>
	{/each}
</AutoColliders>
