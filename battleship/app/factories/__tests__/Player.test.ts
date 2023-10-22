import Player, { IreturnPlayer } from "../Player";

describe("Player factory", () => {
	let player1: IreturnPlayer;
	let player2: IreturnPlayer;

	beforeEach(() => {
		player1 = Player("Prasses");
		player2 = Player("Computer");
	});

	it("tests attack function", () => {
		player1.toggleIsTurn();
		const message: string = player1.attack(player2, { x: 0, y: 0 });
		expect(message.toUpperCase()).toBe(
			"Prasses, you have missed the shot".toUpperCase()
		);
	});

	it("randomly places ship", () => {
		expect(player1.randomlyAddShip()).toBe(true);
	});

	it("check turn", () => {
		player1.toggleIsTurn();
		expect(player1.attack(player2, { x: 0, y: 0 })).toBe(
			"Prasses, You have missed the shot"
		);
		expect(player2.attack(player1, { x: 0, y: 0 })).toBe(
			"Computer, it's not your turn !! Chill 😮‍💨"
		);
	});
});
