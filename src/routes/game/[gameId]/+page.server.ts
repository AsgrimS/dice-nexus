import { error } from "@sveltejs/kit";

import prisma from "$lib/prisma";

import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
	if (event.params.gameId !== "123") {
		throw error(404, "Game not found");
	}

	const response = await prisma.game.findMany();

	return {
		gameId: "123",
		games: response,
	};
}
