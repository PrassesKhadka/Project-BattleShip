import Gameboard from "../Gameboard";
import Ship, { IreturnShip } from "../Ship";

describe("Ship factory function", () => {
	it("test isSunk functionality", () => {
		const gameboard = Gameboard();
		const ship = Ship(3, true);
		expect(ship.isSunk()).toBe(false);
		gameboard.placeShip(ship, { x: 0, y: 0 });
		gameboard.receiveAttack({ x: 0, y: 0 });
		gameboard.receiveAttack({ x: 0, y: 1 });
		expect(ship.isSunk()).toBe(false);
		gameboard.receiveAttack({ x: 0, y: 2 });
		expect(ship.isSunk()).toBe(true);
		expect(ship.getHits()).toBe(3);
	});

	it("test isToggleDirection function", () => {
		const ship = Ship(3, true);
		expect(ship.getIsHorizontal()).toBe(true);
		ship.isToggleDirection();
		expect(ship.getIsHorizontal()).toBe(false);
	});
});
