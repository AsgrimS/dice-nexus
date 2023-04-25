<script lang="ts" context="module">
	export type DiceType = "D4" | "D6" | "D8" | "D12" | "D20";
</script>

<script lang="ts">
	import * as THREE from "three";
	import { createEventDispatcher } from "svelte";
	import { T } from "@threlte/core";
	import { useGltf } from "@threlte/extras";
	import { RigidBody, AutoColliders } from "@threlte/rapier";
	import { derived } from "svelte/store";

	import type { RigidBody as RigidBodyType } from "@dimforge/rapier3d-compat";

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

	const dispatch = createEventDispatcher<{ sleep: RigidBodyType }>();

	const t = (1.0 + Math.sqrt(5.0)) / 2.0;

	const vertices: { x: number; y: number; z: number }[] = [
		{ x: -1, y: t, z: 0 },
		{ x: 1, y: t, z: 0 },

		{ x: -1, y: -t, z: 0 },
		{ x: 1, y: -t, z: 0 },

		{ x: 0, y: -1, z: t },
		{ x: 0, y: 1, z: t },

		{ x: 0, y: -1, z: -t },
		{ x: 0, y: 1, z: -t },

		{ x: t, y: 0, z: -1 },
		{ x: t, y: 0, z: 1 },

		{ x: -t, y: 0, z: -1 },
		{ x: -t, y: 0, z: 1 },
	];

	const faces: Array<[number, number, number]> = [
		[0, 11, 5],
		[0, 5, 1],
		[0, 1, 7],
		[0, 7, 10],
		[0, 10, 11],
		[1, 5, 9],
		[5, 11, 4],
		[11, 10, 2],
		[10, 7, 6],
		[7, 1, 8],
		[3, 9, 4],
		[3, 4, 2],
		[3, 2, 6],
		[3, 6, 8],
		[3, 8, 9],
		[4, 9, 5],
		[2, 4, 11],
		[6, 2, 10],
		[8, 6, 7],
		[9, 8, 1],
	];

	function calculateNormalForTriangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
		const v0 = new THREE.Vector3();
		const v1 = new THREE.Vector3();
		const normal = new THREE.Vector3();

		v0.subVectors(c, b);
		v1.subVectors(a, b);
		normal.crossVectors(v0, v1);

		return normal.normalize();
	}

	function getNormals(vertices: any, faces: any) {
		const normals = [];
		for (let i = 0; i < faces.length; i++) {
			const face = faces[i];
			const v1 = vertices[face[0]];
			const v2 = vertices[face[1]];
			const v3 = vertices[face[2]];
			const normal = calculateNormalForTriangle(
				new THREE.Vector3(v1.x, v1.y, v1.z),
				new THREE.Vector3(v2.x, v2.y, v2.z),
				new THREE.Vector3(v3.x, v3.y, v3.z)
			);
			normals.push(normal);
		}

		for (const normal of normals) {
			faceNormals.push({
				color: "red",
				normal: new THREE.Vector3(2 * normal.x, 2 * normal.y, 2 * normal.z),
			});
		}

		console.log(normals);
	}

	$: $dice && getNormals(vertices, faces);

	const faceNormals: Array<{
		color: THREE.ColorRepresentation;
		normal: THREE.Vector3;
	}> = [];
</script>

{#if $dice}
	<RigidBody
		{position}
		{rotation}
		{linearVelocity}
		{angularVelocity}
		type={"dynamic"}
		bind:rigidBody
		on:sleep={() => {
			dispatch("sleep", rigidBody);
		}}>
		<AutoColliders shape={"convexHull"} density={10}>
			<T.Mesh castShadow geometry={$dice.geometry} material={$dice.material} />
		</AutoColliders>
		{#each faceNormals as normalVectors}
			<T.Line
				geometry={new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(0, 0, 0),
					normalVectors.normal,
				])}>
				<T.LineBasicMaterial color={normalVectors.color} />
			</T.Line>
		{/each}
	</RigidBody>
{/if}
