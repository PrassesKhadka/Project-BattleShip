// Writing test cases for the gameboard factory function

import Gameboard from "../Gameboard";
import { IreturnShip } from "../Ship";
import { Ilocation } from "../Gameboard";

describe("Gameboard", () => {
	let gameboard: ReturnType<typeof Gameboard>;

	beforeEach(() => {
		gameboard = Gameboard();
	});
	it("should place a ship horizontally", () => {
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

	it("should place a ship vertically", () => {
		const ship: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => false,
		};

		expect(gameboard.placeShip(ship, { x: 0, y: 0 })).toBe(true);
		expect(gameboard.placeShip(ship, { x: 6, y: 0 })).toBe(false);
	});

	it("ships should not overlap", () => {
		const ship1: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => false,
		};
		const ship2: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => false,
		};
		gameboard.placeShip(ship1, { x: 0, y: 0 });
		expect(gameboard.placeShip(ship2, { x: 0, y: 0 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 4, y: 0 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 5, y: 0 })).toBe(true);
	});

	it("ship cannot be placed outside the gameboard", () => {
		// horizontal ship
		const ship1: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => true,
		};
		// vertical ship
		const ship2: IreturnShip = {
			getLength: () => 5,
			hit: () => null,
			isSunk: () => false,
			getIsHorizontal: () => false,
		};

		// checking for horizontal ship
		expect(gameboard.placeShip(ship1, { x: 0, y: 10 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 11, y: 4 })).toBe(false);
		expect(gameboard.placeShip(ship1, { x: 2, y: 6 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 6, y: 4 })).toBe(false);
	});
});
