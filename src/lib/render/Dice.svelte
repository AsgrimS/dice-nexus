<script lang="ts" context="module">
	export type DiceType = "D4" | "D6" | "D8" | "D12" | "D20";
</script>

<script lang="ts">
	import * as THREE from "three";
	import { T } from "@threlte/core";
	import { useGltf } from "@threlte/extras";
	import { RigidBody, AutoColliders } from "@threlte/rapier";
	import { derived } from "svelte/store";

	import type { RigidBody as RigidBodyType } from "@dimforge/rapier3d-compat";

	interface DiceValues {
		[key: string]: THREE.Vector3[];
	}

	export let type: DiceType = "D6";
	export let position: [x: number, y: number, z: number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let linearVelocity: [number, number, number] = [0, 0, 0];
	export let angularVelocity: [number, number, number] = [0, 0, 0];

	let rigidBody: RigidBodyType;

	const gltf = useGltf("/models/Dices.glb");

	const dice = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes[type]) return;
		return gltf.nodes[type];
	});

	// function getFaces(n: number): THREE.Vector3[] {
	// 	const faces: THREE.Vector3[] = [];
	//
	// 	for (let i = 0; i < n; i++) {
	// 		const theta = (2 * Math.PI * i) / n;
	// 		const x = Math.cos(theta);
	// 		const y = Math.sin(theta);
	// 		faces.push(new THREE.Vector3(x, y, 0));
	// 	}
	//
	// 	console.log(faces);
	// 	return faces;
	// }

	const diceValues: DiceValues = {
		D4: [
			new THREE.Vector3(0, 0, -1), // front face
			new THREE.Vector3(0, 2 / Math.sqrt(3), 1 / Math.sqrt(3)), // top face
			new THREE.Vector3(-1 * Math.sqrt(2 / 3), -1 / Math.sqrt(3), 1 / Math.sqrt(3)), // left face
			new THREE.Vector3(Math.sqrt(2 / 3), -1 / Math.sqrt(3), 1 / Math.sqrt(3)), // right face
		],

		D6: [
			new THREE.Vector3(0, -1, 0), // bottom face
			new THREE.Vector3(1, 0, 0), // right face
			new THREE.Vector3(0, 0, 1), // back face
			new THREE.Vector3(0, 0, -1), // front face
			new THREE.Vector3(-1, 0, 0), // left face
			new THREE.Vector3(0, 1, 0), // top face
		],

		// D8: 8,
		// D12: 12,
		// D20: 20,
	};
	function diceSleep() {
		const rotation = rigidBody.rotation();
		const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

		const worldFaces = diceValues[type].map((face) => {
			const dir = new THREE.Vector3();
			dir.copy(face).applyQuaternion(quaternion);
			return dir.normalize();
		});

		const downIndex = worldFaces.reduce((acc, face, i) => {
			if (
				face.dot(new THREE.Vector3(0, -1, 0)) > worldFaces[acc].dot(new THREE.Vector3(0, -1, 0))
			) {
				return i;
			} else {
				return acc;
			}
		}, 0);

		console.log("~~~~~");
		// console.log("index", downIndex);
		console.log("result", downIndex + 1);
	}
</script>

{#if $dice}
	<RigidBody
		{position}
		{rotation}
		{linearVelocity}
		{angularVelocity}
		type={"dynamic"}
		bind:rigidBody
		on:sleep={diceSleep}>
		<AutoColliders shape={"convexHull"} density={10}>
			<T.Mesh castShadow geometry={$dice.geometry} material={$dice.material} />
		</AutoColliders>
	</RigidBody>
{/if}
