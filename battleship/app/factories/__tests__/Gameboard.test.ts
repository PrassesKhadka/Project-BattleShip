import Gameboard, { IthisBoard } from "../Gameboard";
import Ship, { IreturnShip, IthisShip } from "../Ship";

describe("Gameboard", () => {
	let gameboardThis: IthisBoard = { board: [] };

	it("should place a ship horizontally on the board", () => {
		const gameboard = Gameboard.call(gameboardThis);
		const ship: IreturnShip = {
			getDirection: () => "horizontal",
			getLength: () => 3,
			hit: () => null,
			isSunk: () => false,
		};

		expect(gameboard.placeShip(ship, 0, 7)).toBe(true);
		expect(gameboard.placeShip(ship, 0, 9)).toBe(false);
		expect(gameboard.placeShip(ship, 0, 10)).toBe(false);
		expect(gameboard.placeShip(ship, 10, 0)).toBe(false);
	});

	it("should place a ship vertically on the board", () => {
		const gameboard = Gameboard.call(gameboardThis);
		const ship: IreturnShip = {
			getDirection: () => "vertical",
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
		};

		expect(gameboard.placeShip(ship, 1, 2)).toBe(true);
		expect(gameboard.placeShip(ship, 8, 2)).toBe(false);
		expect(gameboard.placeShip(ship, 4, 5)).toBe(true);
		expect(gameboard.placeShip(ship, 10, 5)).toBe(false);
		expect(gameboard.placeShip(ship, 5, 10)).toBe(false);
	});

	// it("should not place a ship outside the board boundaries", () => {
	// 	const gameboard = Gameboard();
	// 	const ship: IreturnShip = {
	// 		getDirection: () => "horizontal",
	// 		getLength: () => 8, // Trying to place a ship too long for the board
	// 	};

	// 	const result = gameboard.placeShip(ship, 2, 2);

	// 	expect(result).toBe(false);
	// });

	// it("should not place a ship with an invalid direction", () => {
	// 	const gameboard = Gameboard();
	// 	const ship: IreturnShip = {
	// 		getDirection: () => "invalid", // Invalid direction
	// 		getLength: () => 3,
	// 	};

	// 	const result = gameboard.placeShip(ship, 2, 2);

	// 	expect(result).toBe(false);
	// });
});
