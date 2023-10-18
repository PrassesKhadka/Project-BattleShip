// Creating a Gameboard factory function

import { IreturnShip, IthisShip } from "./Ship";

const m = 10;
const n = 10;

export interface IthisBoard {
	board: number[][];
}
export interface IreturnGameBoard {
	placeShip: (ship: IreturnShip, y: number, x: number) => boolean;
}

function Gameboard(this: IthisBoard): IreturnGameBoard {
	this.board = [];

	// Fill the 10*10 array with 0
	for (let i = 0; i < m; i++) {
		this.board[i] = [];
		for (let j = 0; j < n; j++) {
			this.board[i][j] = 0;
		}
	}

	// Place the ship in the 10*10 gameboard array(this.board) in the given coordinate
	// In two dimensional array y-coordinate is equal to i i.e the first iterating loop
	const placeShip = (ship: IreturnShip, y: number, x: number): boolean => {
		// Caveat: cannot place the ship
		if (ship.getDirection() === "horizontal") {
			return placeHorizontally(ship, y, x);
		} else if (ship.getDirection() === "vertical") {
			return placeVertically(ship, y, x);
		} else {
			return false;
		}
	};

	const placeHorizontally = (
		ship: IreturnShip,
		y: number,
		x: number
	): boolean => {
		let endx = x + ship.getLength() - 1;
		if (!checkValidity(y, x, endx)) return false;

		while (x != endx) {
			this.board[y][x] = 1;
			x++;
		}
		return true;
	};

	const placeVertically = (
		ship: IreturnShip,
		y: number,
		x: number
	): boolean => {
		let endy = y + ship.getLength() - 1;
		if (!checkValidity(y, x, endy)) return false;
		while (y != endy) {
			this.board[y][x] = 1;
			y++;
		}
		return true;
	};

	const checkValidity = (y: number, x: number, end: number): boolean => {
		if (x >= 10 || y >= 10) {
			return false;
		} else if (end < 10) {
			return true;
		} else {
			return false;
		}
	};

	return { placeShip };
}

export default Gameboard;
