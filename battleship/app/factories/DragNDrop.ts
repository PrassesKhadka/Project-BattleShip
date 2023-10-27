import { Ilocation } from "./Gameboard";
import { IreturnPlayer } from "./Player";
import Ship, { IreturnShip } from "./Ship";

export interface IreturnShipDrag {
	ships: IreturnShip[][];
	placeValid: (
		ship: IreturnShip,
		offset: number,
		onDragLocation: Ilocation
	) => boolean;
}

export default function ShipDrag(player: IreturnPlayer): IreturnShipDrag {
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

	// checking if the place on board is valid for the dragged ship to be placed
	// if valid place and return true else return false
	function placeValid(
		ship: IreturnShip,
		offset: number,
		onDragLocation: Ilocation
	): boolean {
		// onDragLocation--->basically onDragLeaveLocationOnBoard
		const startingPosition = position(ship, offset, onDragLocation);
		const valid = player.getGameBoard().placeShip(ship, startingPosition);
		console.log(valid);
		return valid;
	}

	//returns the startingPosition of the ship on the board
	function position(
		shipDragged: IreturnShip,
		offset: number,
		onDragLocationOnBoard: Ilocation
	): Ilocation {
		let startingPosition: Ilocation;
		if (shipDragged.getIsHorizontal() === true) {
			startingPosition = {
				x: onDragLocationOnBoard.x,
				y: onDragLocationOnBoard.y - offset,
			};
		} else {
			startingPosition = {
				x: onDragLocationOnBoard.x - offset,
				y: onDragLocationOnBoard.y,
			};
		}
		console.log(startingPosition);
		return startingPosition;
	}
	return { ships, placeValid };
}
