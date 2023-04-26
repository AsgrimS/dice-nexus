import { error } from "@sveltejs/kit";

import prisma from "$lib/prisma";

import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
	const gameId = parseInt(params.gameId);

	const game = await prisma.game.findUnique({
		where: { id: gameId },
		include: { players: true },
	});

	if (!game) {
		throw error(404, "Game not found");
	}

	return {
		gameName: game.name,
		players: game.players,
	};
}) satisfies PageServerLoad;
