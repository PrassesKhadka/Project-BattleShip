import ShipDrag, { IreturnShipDrag } from "../DragNDrop";
import Player, { IreturnPlayer } from "../Player";
import { IreturnShip } from "../Ship";
import { Ilocation } from "../Gameboard";

describe("DragNDrop", () => {
	let arrayShips: IreturnShipDrag;
	const player: IreturnPlayer = Player("Prasses");

	beforeEach(() => {
		arrayShips = ShipDrag(player);
	});

	it("Creates ships", () => {
		arrayShips.ships.forEach((subArray) => {
			expect(subArray.every((ship) => typeof ship === "object")).toBe(true);
		});
		// console.log(arrayShips);
	});
	it("placeShips on the gameboard", () => {
		// ship that is being dragged
		// horizontal placing
		const shipDragged1 = arrayShips.ships[0][0];
		// vertical placing
		arrayShips.ships[1][0].isToggleDirection();
		const shipDragged2 = arrayShips.ships[1][0];
		// const onDragLocationOnShip = 1;
		// therefore the offset is onDragLocationOnShip
		const offset = 1;
		const result1 = arrayShips.placeValid(shipDragged1, offset, { x: 0, y: 1 });
		const result2 = arrayShips.placeValid(shipDragged2, offset, { x: 8, y: 4 });
		console.log(result1);
		expect(result1).toBe(true);
		expect(result2).toBe(true);
		console.log(player.getGameBoard().board);
	});
});
