// Writing test cases for the gameboard factory function

import Gameboard from "../Gameboard";
import Ship, { IreturnShip } from "../Ship";
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
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => true,
			getHits: () => 0,
		};

		expect(gameboard.placeShip(ship, { x: 1, y: 5 })).toBe(true);
		expect(gameboard.placeShip(ship, { x: 2, y: 6 })).toBe(false);
	});

	it("should place a ship vertically", () => {
		const ship: IreturnShip = {
			getLength: () => 5,
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => false,
			getHits: () => 0,
		};

		expect(gameboard.placeShip(ship, { x: 0, y: 0 })).toBe(true);
		expect(gameboard.placeShip(ship, { x: 6, y: 0 })).toBe(false);
	});

	it("ships should not overlap", () => {
		const ship1: IreturnShip = {
			getLength: () => 5,
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => false,
			getHits: () => 0,
		};
		const ship2: IreturnShip = {
			getLength: () => 5,
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => false,
			getHits: () => 0,
		};
		gameboard.placeShip(ship1, { x: 0, y: 0 });
		expect(gameboard.placeShip(ship2, { x: 0, y: 0 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 5, y: 0 })).toBe(true);
	});

	it("ship cannot be placed outside the gameboard", () => {
		// horizontal ship
		const ship1: IreturnShip = {
			getLength: () => 5,
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => true,
			getHits: () => 0,
		};
		// vertical ship
		const ship2: IreturnShip = {
			getLength: () => 5,
			hit: () => false,
			isSunk: () => false,
			getIsHorizontal: () => false,
			getHits: () => 0,
		};

		// checking for horizontal ship
		expect(gameboard.placeShip(ship1, { x: 0, y: 10 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 11, y: 4 })).toBe(false);
		expect(gameboard.placeShip(ship1, { x: 2, y: 6 })).toBe(false);
		expect(gameboard.placeShip(ship2, { x: 6, y: 4 })).toBe(false);
	});

	// Testing for receiveAttack
	describe("Receive attack", () => {
		it("Ships are successfully hit or shot missed", () => {
			const ship1: IreturnShip = {
				getLength: () => 5,
				hit: () => false,
				isSunk: () => false,
				getIsHorizontal: () => true,
				getHits: () => 0,
			};
			gameboard.placeShip(ship1, { x: 4, y: 4 });
			expect(gameboard.receiveAttack({ x: 4, y: 4 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 4, y: 5 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 4, y: 6 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 4, y: 7 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 4, y: 8 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 4, y: 9 })).toBe(
				"You have missed the shot"
			);
			expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(
				"You have missed the shot"
			);
		});

		it("shot is at previously hit/miss index", () => {
			const ship1: IreturnShip = {
				getLength: () => 5,
				hit: () => false,
				isSunk: () => false,
				getIsHorizontal: () => true,
				getHits: () => 0,
			};
			gameboard.placeShip(ship1, { x: 4, y: 4 });
			gameboard.receiveAttack({ x: 4, y: 4 });
			gameboard.receiveAttack({ x: 0, y: 0 });
			expect(gameboard.receiveAttack({ x: 4, y: 4 })).toBe(
				"Sorry previously Hit index !!!"
			);
			expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(
				"Sorry previously Hit index !!!"
			);
		});

		it("ship is sunk", () => {
			const ship1 = Ship(3, true);
			gameboard.placeShip(ship1, { x: 1, y: 1 });
			expect(gameboard.receiveAttack({ x: 1, y: 1 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 1, y: 2 })).toBe(
				"You have successfully hit the ship"
			);
			expect(gameboard.receiveAttack({ x: 1, y: 3 })).toBe("Ship is sunk");
		});

		it("all ship sank", () => {
			// Keeping n(i.e the number of ships) in Gameboard.ts to be 2 to make the test easy #passed
			// const ship1 = Ship(3, false);
			// const ship2 = Ship(3, true);
			// gameboard.placeShip(ship1, { x: 0, y: 0 });
			// gameboard.placeShip(ship2, { x: 4, y: 5 });
			// // console.log(gameboard.board);
			// //Hitting ship1
			// gameboard.receiveAttack({ x: 0, y: 0 });
			// gameboard.receiveAttack({ x: 1, y: 0 });
			// expect(gameboard.receiveAttack({ x: 2, y: 0 })).toBe("Ship is sunk");
			// // Hitting ship2
			// gameboard.receiveAttack({ x: 4, y: 5 });
			// gameboard.receiveAttack({ x: 4, y: 6 });
			// expect(gameboard.receiveAttack({ x: 4, y: 7 })).toBe("All ships sunk");
		});
	});
});
