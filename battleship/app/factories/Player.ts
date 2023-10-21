// Creating a player factory
import Gameboard, { Ilocation } from "./Gameboard";
import Ship, { IreturnShip } from "./Ship";
import { IreturnGameBoard } from "./Gameboard";

export interface IreturnPlayer {
	getName: () => string;
	getGameBoard: () => IreturnGameBoard;
	attack: () => string;
	addShip: () => boolean;
}

export default function Player(name: string) {
	const gameboard: IreturnGameBoard = Gameboard();
	const Ships: IreturnShip[] = [];

	function getGameBoard(): IreturnGameBoard {
		return gameboard;
	}
	function getName(): string {
		return name;
	}
	function attack(opponent: IreturnPlayer, location: Ilocation): string {
		const opponentGameBoard = opponent.getGameBoard();
		const message = opponentGameBoard.receiveAttack(location);
		return `${name} ${message}`.toUpperCase();
	}
	function addShip(): boolean {
		return true;
	}
	return { getName, getGameBoard, attack, addShip };
}
