import ShipDrag from "../DragNDrop";
import { IreturnShip } from "../Ship";

describe("DragNDrop", () => {
	it("Creates ships", () => {
		const ships = ShipDrag();
		ships.ships.forEach((subArray) => {
			expect(subArray.every((ship) => typeof ship === "object")).toBe(true);
		});
		console.log(ships);
	});
});
