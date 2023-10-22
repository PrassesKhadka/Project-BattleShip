// Creating a player factory
import Gameboard, { Ilocation } from "./Gameboard";
import Ship, { IreturnShip } from "./Ship";
import { IreturnGameBoard } from "./Gameboard";

export interface IreturnPlayer {
	getName: () => string;
	getGameBoard: () => IreturnGameBoard;
	attack: (opponent: IreturnPlayer, location: Ilocation) => string;
	randomlyAddShip: () => boolean;
	getIsTurn: () => boolean;
	toggleIsTurn: () => boolean;
}

export default function Player(name: string) {
	const gameboard: IreturnGameBoard = Gameboard();
	const Ships: IreturnShip[] = [];
	let isTurn: boolean = false;

	function toggleIsTurn(): boolean {
		isTurn = !isTurn;
		return isTurn;
	}
	function getIsTurn(): boolean {
		return isTurn;
	}
	function getGameBoard(): IreturnGameBoard {
		return gameboard;
	}
	function getName(): string {
		return name;
	}
	function attack(opponent: IreturnPlayer, location: Ilocation): string {
		if (isTurn === true) {
			const opponentGameBoard = opponent.getGameBoard();
			const message = opponentGameBoard.receiveAttack(location);
			return `${name}, ${message}`;
		} else {
			return `${name}, it's not your turn !! Chill 😮‍💨`;
		}
	}
	function randomlyAddShip(): boolean {
		let length = 2;
		//To add 5 ships randomly in the gameboard array
		for (let i = 0; i < 5; i++) {
			let isHorizontal = getRandomBoolean();
			let location = getRandomLocation();
			let value: boolean = false;
			const ship = Ship(length, isHorizontal);
			// jaba samma false aaucha placeShip garna khojney,once true returned i.e ship placed out of this loop
			while (!value) {
				value = gameboard.placeShip(ship, location);
				// If the ship cannot be placed in that location
				if (!value) {
					location = getRandomLocation();
				}
			}
			length++;
		}
		return true;
	}

	function getRandomBoolean(): boolean {
		const value = Math.random();
		if (value <= 0.5) {
			return true;
		} else {
			return false;
		}
	}

	function getRandomLocation(): Ilocation {
		// Random number from 0-9
		let location: Ilocation = {
			x: Math.floor(Math.random() * 10),
			y: Math.floor(Math.random() * 10),
		};
		return location;
	}

	return {
		getName,
		getGameBoard,
		attack,
		randomlyAddShip,
		getIsTurn,
		toggleIsTurn,
	};
}
