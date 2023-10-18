// Creating a Ship factory function

import { Tplayer } from "./Player";

type Tdirection = "vertical" | "horizontal";
export interface IthisShip {
	length: number;
	player: Tplayer;
	hits: number;
	direction: Tdirection;
}
export interface IreturnShip {
	getLength: () => number;
	getDirection: () => Tdirection;
	hit: () => void;
	isSunk: () => boolean;
}

function Ship(
	this: IthisShip,
	length: number,
	player: Tplayer,
	direction: Tdirection
): IreturnShip {
	this.length = length;
	this.player = player;
	this.hits = 0;
	this.direction = direction;

	const getLength = (): number => {
		return this.length;
	};
	const getDirection = (): Tdirection => {
		return this.direction;
	};

	const hit = (): void => {
		this.hits += 1;
	};

	const isSunk = (): boolean => {
		if (this.hits === this.length) return true;
		else return false;
	};

	return { getLength, getDirection, hit, isSunk };
}

export default Ship;
