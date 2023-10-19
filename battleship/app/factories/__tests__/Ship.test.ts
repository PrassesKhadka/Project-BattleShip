import Gameboard from "../Gameboard";
import Ship, { IreturnShip, IthisShip } from "../Ship";

describe("Ship factory function", () => {
	it("test hit functionality", () => {
		// const gameboard = Gameboard.call();
		// 	// mock a ship object first
		// 	const ship: IreturnShip = {
		// 		getLength: () => 4,
		// 		getDirection: () => "horizontal",
		// 		hit: () => null,
		// 		isSunk: () => false,
		// 	};
		// 	// placing the ship in [3,4] coordinate of the game board
		// 	gameboard.placeShip(ship, 3, 4);
		// 	ship.hit();
		// 	expect(ship.isSunk()).toBe(false);
		// 	//now if we sink the ship
		// 	for (let i = 0; i < ship.getLength(); i++) {
		// 		ship.hit();
		// 	}
		// 	expect(ship.isSunk()).toBe(true);
	});
});
