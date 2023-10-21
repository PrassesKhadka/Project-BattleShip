import Player, { IreturnPlayer } from "../Player";

describe("Player factory", () => {
	it("tests attack function", () => {
		const player1: IreturnPlayer = Player("Prasses");
		const player2: IreturnPlayer = Player("Computer");
		const message: string = player1.attack(player2, { x: 0, y: 0 });
		expect(message.toUpperCase()).toBe(
			"Prasses you have missed the shot".toUpperCase()
		);
	});
});
