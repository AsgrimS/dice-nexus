import { PrismaClient } from "@prisma/client";

import type { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.PlayerCreateInput[] = [
	{
		email: "john@email.com",
		name: "John",
	},
	{
		email: "bob@prisma.com",
		name: "Bob",
	},
];

const games: Prisma.GameCreateInput[] = [
	{
		name: "Dangerous Mansion",
		players: {
			connect: [{ email: users[0].email }, { email: users[1].email }],
		},
	},
];

async function main() {
	for (const { email, name } of users) {
		const user = await prisma.player.upsert({
			where: { email },
			update: {},
			create: {
				email,
				name,
			},
		});
		console.log(`Created user with id: ${user.id}`);
	}

	await prisma.game.deleteMany();
	for (const { name, players } of games) {
		const game = await prisma.game.upsert({
			where: { id: 1 },
			update: {},
			create: {
				name,
				players,
			},
		});

		console.log(`Created game with id: ${game.id}`);
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
