import ShipDrag, { IreturnShipDrag } from "../DragNDrop";
import Player, { IreturnPlayer } from "../Player";
import { IreturnShip } from "../Ship";
import { Ilocation } from "../Gameboard";

describe("DragNDrop", () => {
	let arrayShips: IreturnShipDrag;
	const player: IreturnPlayer = Player("Prasses");

	beforeEach(() => {
		arrayShips = ShipDrag(player);
		arrayShips.createShips();
	});

	it("Creates getShips()", () => {
		arrayShips.getShips().forEach((subArray) => {
			expect(subArray.every((ship) => typeof ship === "object")).toBe(true);
		});
		// console.log(arrayShips);
	});
	it("placeShips on the gameboard", () => {
		// ship that is being dragged
		// horizontal placing
		const shipDragged1 = arrayShips.getShips()[0][0];
		// vertical placing
		arrayShips.getShips()[1][0].isToggleDirection();
		const shipDragged2 = arrayShips.getShips()[1][0];
		// const onDragLocationOnShip = 1;
		// therefore the offset is onDragLocationOnShip
		const offset = 1;
		const result1 = arrayShips.placeValid(shipDragged1, offset, { x: 0, y: 1 });
		const result2 = arrayShips.placeValid(shipDragged2, offset, { x: 8, y: 4 });
		const result3 = arrayShips.placeValid(shipDragged1, 0, { x: 0, y: 0 });
		// console.log(result1);
		expect(result1).toBe(true);
		expect(result2).toBe(true);
		expect(result3).toBe(false);
		// console.log(player.getGameBoard().board);
	});

	it("removes placed ship from the getShips() array", () => {
		// choosing ship with length :3
		// const arrayShips2 = ShipDrag(Player("abcd"));
		// arrayShips2.createShips();
		// const shipDragged1 = arrayShips.getShips()[1][0];
		// const result1 = arrayShips2.placeValid(shipDragged1, 0, { x: 8, y: 0 });
		// console.log(arrayShips2.getShips());
		// expect(arrayShips2.getShips().length).toBe(4);
		// const result2 = arrayShips2.placeValid(shipDragged1, 0, { x: 5, y: 6 });
		// expect(arrayShips2.getShips().length).toBe(3);
	});

	it("removes all ships ", () => {
		expect(arrayShips.removeAllShips()).toBe(true);
		expect(arrayShips.getShips()).toStrictEqual([]);
		arrayShips.createShips();
		// console.log(arrayShips.getShips());
	});
});
