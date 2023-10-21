import Player, { IreturnPlayer } from "../Player";

describe("Player factory", () => {
	let player1: IreturnPlayer;
	let player2: IreturnPlayer;

	beforeEach(() => {
		player1 = Player("Prasses");
		player2 = Player("Computer");
	});

	it("tests attack function", () => {
		const message: string = player1.attack(player2, { x: 0, y: 0 });
		expect(message.toUpperCase()).toBe(
			"Prasses you have missed the shot".toUpperCase()
		);
	});

	it("randomly places ship", () => {
		expect(player1.randomlyAddShip()).toBe(true);
		console.log(player1.getGameBoard());
	});
});
