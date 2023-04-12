import { error } from "@sveltejs/kit";

import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
	if (event.params.gameId !== "123") {
		throw error(404, "Game not found");
	}
	return {
		gameId: "123",
	};
}
