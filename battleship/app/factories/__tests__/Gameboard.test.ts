// Writing test cases for the gameboard factory function

import Gameboard from "../Gameboard";
import { IreturnShip } from "../Ship";
import { Ilocation } from "../Gameboard";

describe("Gameboard", () => {
	let gameboard: ReturnType<typeof Gameboard>;

	it("should place a ship horizontally", () => {
		gameboard = Gameboard();
		// a ship object mock
		const ship: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => true,
		};

		expect(gameboard.placeShip(ship, { x: 1, y: 5 })).toBe(true);
		expect(gameboard.placeShip(ship, { x: 2, y: 6 })).toBe(false);
	});

	// it("should place a ship vertically", () => {
	// 	// a ship object mock
	// 	const ship: IreturnShip = {
	// 		hit: () => null,
	// 		isSunk: () => false,
	// 		getIsHorizontal: () => false,
	// 		getLength: () => 3,
	// 	};

	// 	expect(gameboard.placeShip(ship, { x: 0, y: 0 })).toBe(true);
	// });
	// it("should not place a ship outside the gameboard boundaries", () => {
	// 	const ship: IreturnShip = {
	// 		hit: () => null,
	// 		isSunk: () => false,
	// 		getIsHorizontal: () => true,
	// 		getLength: () => 8,
	// 	};
	// 	const location: Ilocation = { x: 2, y: 2 };

	// 	const result = gameboard.placeShip(ship, location);

	// 	expect(result).toBe(false);
	// 	// Add more expectations to check that the ship wasn't placed
	// });

	// it("should not place a ship if it overlaps with another ship", () => {
	// 	// Place a ship to create an overlap
	// 	const firstShip: IreturnShip = {
	// 		hit: () => null,
	// 		isSunk: () => false,
	// 		getIsHorizontal: () => true,
	// 		getLength: () => 3,
	// 	};
	// 	const firstLocation: Ilocation = { x: 2, y: 2 };
	// 	gameboard.placeShip(firstShip, firstLocation);

	// 	// Try to place another ship that overlaps with the first one
	// 	const secondShip: IreturnShip = {
	// 		hit: () => null,
	// 		isSunk: () => false,
	// 		getIsHorizontal: () => true,
	// 		getLength: () => 2,
	// 	};
	// 	const secondLocation: Ilocation = { x: 2, y: 3 };

	// 	const result = gameboard.placeShip(secondShip, secondLocation);

	// 	expect(result).toBe(false);
	// 	// Add more expectations to check that the ship wasn't placed
	// });
});
