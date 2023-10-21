// Creating a Gameboard factory function

import { IreturnShip } from "./Ship";

// The size of the gameboard array
const m = 10;
// The number of ships
const n = 5;

// Declaring the types and interfaces here
export type TboardData = 0 | IreturnShip;
export interface Ilocation {
	x: number;
	y: number;
}
export interface IreturnGameBoard {
	board: TboardData[][];
	hitIndex: Ilocation[];
	missIndex: Ilocation[];
	occupiedIndex: Ilocation[];
	placeShip: (ship: IreturnShip, location: Ilocation) => boolean;
	receiveAttack: (location: Ilocation) => string;
}

// #The main factory function Gameboard
export default function Gameboard(): IreturnGameBoard {
	//Private datas of Gameboard defined
	// Fill the 10*10 array with 0
	const board = Array(m)
		.fill([])
		.map(() => Array(m).fill(0));
	let hitIndex: Ilocation[] = [];
	let missIndex: Ilocation[] = [];
	let occupiedIndex: Ilocation[] = [];
	let sunkShips: IreturnShip[] = [];
	// Private datas of Gameboard definition ends

	// Place the ship in the 10*10 gameboard array(this.board) in the given coordinate
	function placeShip(ship: IreturnShip, location: Ilocation): boolean {
		// Caveat: checks if ship can be placed or not
		if (!checkValidity(ship, location)) return false;
		// Now since the check is complete now let's place the ships in the given coordinates in the gameboard
		else if (ship.getIsHorizontal()) {
			return placeHorizontally(ship, location);
		} else {
			return placeVertically(ship, location);
		}
	}

	//Now when the ship receives attack
	function receiveAttack(location: Ilocation): string {
		let boardData: TboardData = board[location.x][location.y];
		// checking if the attack is done on the previously hit or miss shot first
		if (
			// .includes causes referential checking so .some used
			hitIndex.some(
				(item: Ilocation) => item.x === location.x && item.y === location.y
			) ||
			missIndex.some(
				(item: Ilocation) => item.x === location.x && item.y === location.y
			)
		) {
			return "Sorry previously Hit index !!!";
		} else if (boardData === 0) {
			return miss(location);
		} else {
			return hit(location, boardData);
		}
	}

	function miss(location: Ilocation): string {
		missIndex.push({ x: location.x, y: location.y });
		return "You have missed the shot";
	}

	function hit(location: Ilocation, boardData: IreturnShip): string {
		hitIndex.push({ x: location.x, y: location.y });
		boardData.hit();
		if (checkSunk(boardData)) {
			if (allShipSunk()) {
				return "All ships sunk";
			} else {
			}
			return "Ship is sunk";
		} else {
			return "You have successfully hit the ship";
		}
	}
	function checkSunk(boardData: IreturnShip): boolean {
		if (boardData.isSunk()) {
			sunkShips.push(boardData);
			return true;
		} else {
			return false;
		}
	}
	function allShipSunk(): boolean {
		if (sunkShips.length === n) {
			return true;
		} else {
			return false;
		}
	}

	// Function to check the validity
	function checkValidity(ship: IreturnShip, location: Ilocation): boolean {
		let end;
		let x = location.x;
		let y = location.y;
		// Checking the end coordinates
		if (ship.getIsHorizontal()) {
			end = y + ship.getLength() - 1;
		} else {
			end = x + ship.getLength() - 1;
		}
		// 1st case:the starting coordinate should be within the gameboard
		if (x < 0 || x > m || y < 0 || y > m) {
			return false;
		}
		// 2nd case: the ship's length should be within the gameboard
		else if (ship.getLength() > m - 1) {
			return false;
		}
		// 3rd case: end coordinates should be within the gameboard
		else if (end > m - 1) {
			return false;
		}
		// 4th case:overlapping case:the ship's should not be placed on top of eachother
		else if (ship.getIsHorizontal()) {
			let y = location.y;
			while (y != end + 1) {
				if (board[x][y] != 0) return false;
				y++;
			}
			return true;
		} else {
			let x = location.x;
			while (x != end + 1) {
				if (board[x][y] != 0) return false;
				x++;
			}
			return true;
		}
	}

	// Function to place ships Horizontally
	function placeHorizontally(ship: IreturnShip, location: Ilocation) {
		let end = location.y + ship.getLength() - 1;
		let y = location.y;
		while (y != end + 1) {
			board[location.x][y] = ship;
			occupiedIndex.push({ x: location.x, y: y });
			y++;
		}
		return true;
	}

	// Function to place ships vertically
	function placeVertically(ship: IreturnShip, location: Ilocation) {
		let end = location.x + ship.getLength() - 1;
		let x = location.x;
		while (x != end + 1) {
			board[x][location.y] = ship;
			occupiedIndex.push({ x: x, y: location.y });
			x++;
		}
		return true;
	}

	return {
		board,
		hitIndex,
		missIndex,
		occupiedIndex,
		placeShip,
		receiveAttack,
	};
}
