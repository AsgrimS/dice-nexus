<script lang="ts">
	import { Canvas, T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { degToRad } from "three/src/math/MathUtils";
	import { World } from "@threlte/rapier";

	import Dice, { type DiceType } from "$lib/render/Dice.svelte";
	import Table from "$lib/render/Table.svelte";

	type Body = {
		id: string;
		position: [number, number, number];
		rotation: [number, number, number];
		type: DiceType;
	};

	const possibleDices: DiceType[] = ["D4", "D6", "D8", "D12", "D20"];

	let dices: Body[] = [];

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
</script>

<Canvas>
	<World>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
			<OrbitControls maxPolarAngle={degToRad(80)} enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.2} />

		{#each dices as dice (dice.id)}
			<Dice
				type={dice.type}
				position={dice.position}
				rotation={dice.rotation}
				linearVelocity={[10, -3, 0]}
				angularVelocity={[0, 0, -5]} />
		{/each}

		<Table />
	</World>
</Canvas>
