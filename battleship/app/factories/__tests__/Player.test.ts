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
		expect(player2.attack(player1, { x: 0, y: 0 })).toBe(
			"Computer, it's not your turn !! Chill 😮‍💨"
		);
		expect(player1.attack(player2, { x: 0, y: 0 })).toBe(
			"Prasses, You have missed the shot"
		);
		expect(player2.attack(player1, { x: 0, y: 0 })).toBe(
			"Computer, You have missed the shot"
		);
	});
	it("randomlyHitShip functionality", () => {
		player1.randomlyAddShip();
		// not player1's turn
		expect(player1.randomlyHitShip(player2)).toBe(false);
		player1.toggleIsTurn();
		// Now player1's turn
		expect(player1.randomlyHitShip(player2)).not.toBe(false);
		// Now player2's turn
		expect(player1.randomlyHitShip(player2)).toBe(false);
		// player2 attacks,now player1's turn
		player2.attack(player1, { x: 0, y: 0 });

		// Sorry previously hit index should not appear
		for (let i = 0; i < 99; i++) {
			expect(player1.randomlyHitShip(player2)).not.toBe(false);
			let value = player2.randomlyHitShip(player1);
			if (typeof value === "object") {
				expect(value).not.toBe("Sorry previously Hit index !!!");
			}
		}
	});
});
