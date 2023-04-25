<script lang="ts">
	import { Canvas, T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { degToRad } from "three/src/math/MathUtils";
	import { World, Debug } from "@threlte/rapier";

	import Dice, { type DiceType } from "$lib/render/Dice.svelte";
	import Table from "$lib/render/Table.svelte";

	import type { Collider, RigidBody as RigidBodyType } from "@dimforge/rapier3d-compat";

	type Body = {
		id: string;
		position: [number, number, number];
		rotation: [number, number, number];
		type: DiceType;
	};

	export function spawnDice() {
		const newDice: Body = {
			id: getId(),
			position: getRandomPosition(),
			rotation: getRandomRotation(),
			type: possibleDices[getRandomInt(possibleDices.length)],
		};
		dices.push(newDice);

		if (dices.length > 5) {
			dices.splice(0, 1);
		}

		dices = dices;
	}

	const possibleDices: DiceType[] = ["D4", "D6", "D8", "D12", "D20"];

	let dices: Body[] = [];
	let tableColliders: Collider[];

	function getId() {
		return Math.random().toString(16).slice(2);
	}

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function getRandomPosition(): [number, number, number] {
		return [-13, Math.random() + 5, 0.5 - Math.random()];
	}

	function getRandomRotation(): [number, number, number] {
		return [Math.random() * 10, Math.random() * 10, Math.random() * 10];
	}

	// function onDiceSleep(event: CustomEvent<RigidBodyType>) {
	// 	const body = event.detail;
	// 	// console.log(body.numColliders());
	// 	// console.log(body.collider(0).contactCollider(tableColliders[0], 0.01));
	// }
</script>

<Canvas>
	<World gravity={[0, 0, 0]}>
		<Debug />
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
			<OrbitControls maxPolarAngle={degToRad(80)} enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.2} />

		{#each dices as dice (dice.id)}
			<!-- <Dice -->
			<!-- 	type={"D8"} -->
			<!-- 	position={dice.position} -->
			<!-- 	rotation={dice.rotation} -->
			<!-- 	linearVelocity={[10, -3, 0]} -->
			<!-- 	angularVelocity={[0, 0, -5]} -->
			<!-- 	on:sleep={onDiceSleep} /> -->

			<Dice type={"D20"} position={[0, 5, 0]} />
		{/each}

		<Table bind:colliders={tableColliders} />
	</World>
</Canvas>
