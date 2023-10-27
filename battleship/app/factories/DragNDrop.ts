import Ship, { IreturnShip } from "./Ship";

export interface IreturnShipDrag {
	ships: IreturnShip[][];
}

export default function ShipDrag(): IreturnShipDrag {
	let length = 2;
	const ships: IreturnShip[][] = [];

	// 5 ships created
	for (let i = 0; i < 5; i++) {
		const ship = Ship(length, true);
		const arrShip: IreturnShip[] = [];
		for (let i = 0; i < ship.getLength(); i++) {
			arrShip.push(ship);
		}
		ships.push(arrShip);

		length++;
	}

	return { ships };
}
