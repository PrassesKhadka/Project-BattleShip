// Creating a Gameboard factory function

import { IreturnShip, IthisShip } from "./Ship";

// The size of the gameboard array
const m = 10;

export interface Ilocation {
	x: number;
	y: number;
}
export interface IreturnGameBoard {
	placeShip: (ship: IreturnShip, location: Ilocation) => boolean;
}

export default function Gameboard(): IreturnGameBoard {
	// Fill the 10*10 array with 0
	const board = Array(m)
		.fill([])
		.map(() => Array(m).fill(0));

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

	// Funciton to check the validity
	function checkValidity(ship: IreturnShip, location: Ilocation): boolean {
		let end;
		// Checking the end coordinates
		if (ship.getIsHorizontal()) {
			end = location.y + ship.getLength() - 1;
		} else {
			end = location.x + ship.getLength() - 1;
		}
		// 1st case:the starting coordinate should be within the gameboard
		if (location.x < 0 || location.x > m || location.y < 0 || location.y > m) {
			return false;
		}
		// 2nd case: the ship's length should be within the gameboard
		else if (ship.getLength() > m - 1) {
			return false;
		}
		// 3rd case:end coordinates should be within the gameboard
		else if (end > m - 1) {
			return false;
		}
		// 4th case:overlapping case:the ship's should not be placed on top of eachother
		else if (ship.getIsHorizontal()) {
			let y = location.y;
			while (y != end + 1) {
				if (board[location.x][y] === 1) return false;
				y++;
			}
			return true;
		} else {
			let x = location.x;
			while (x != end + 1) {
				if (board[x][location.y] === 1) return false;
				x++;
			}
			return true;
		}
	}

	// Function to place ships Horizontally
	function placeHorizontally(ship: IreturnShip, location: Ilocation) {
		let end = location.x + ship.getLength() - 1;
		let y = location.y;
		while (y != end + 1) {
			board[location.x][y] = 1;
			y++;
		}
		return true;
	}

	// Function to place ships vertically
	function placeVertically(ship: IreturnShip, location: Ilocation) {
		let end = location.y + ship.getLength() - 1;
		let x = location.x;
		while (x != end + 1) {
			board[x][location.y] = 1;
			x++;
		}
		return true;
	}

	//Now when the ship receives attack

	return { placeShip };
}
