import { Ilocation } from "./Gameboard";
import { IreturnPlayer } from "./Player";
import Ship, { IreturnShip } from "./Ship";

export interface IreturnShipDrag {
	createShips: () => void;
	getShips: () => IreturnShip[][];
	placeValid: (
		ship: IreturnShip,
		offset: number,
		onDragLocation: Ilocation
	) => boolean;
}

export default function ShipDrag(player: IreturnPlayer): IreturnShipDrag {
	let length = 2;
	const ships: IreturnShip[][] = [];
	createShips();
	function createShips() {
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
	}

	function getShips(): IreturnShip[][] {
		return ships;
	}
	// checking if the place on board is valid for the dragged ship to be placed
	// if valid place and return true else return false
	// Here ship is the draggedItem(ship) that we are passing
	function placeValid(
		draggedShip: IreturnShip,
		offset: number,
		onDragLocation: Ilocation
	): boolean {
		// onDragLocation--->basically onDragLeaveLocationOnBoard
		const startingPosition = position(draggedShip, offset, onDragLocation);
		const valid = player
			.getGameBoard()
			.placeShip(draggedShip, startingPosition);
		// Now if dragged-drop and place on gameboard pop the ship from the array
		if (valid) {
			const index = ships.findIndex((ship) => ship[0] === draggedShip);
			if (index !== -1) {
				ships.splice(index, 1);
			}
		}

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
		// console.log(startingPosition);
		return startingPosition;
	}
	return { createShips, getShips, placeValid };
}
