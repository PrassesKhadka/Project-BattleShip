// Creating a Ship factory function

import { Tplayer } from "./Player";

export interface IthisShip {
	length: number;
	player: Tplayer;
	hits: number;
	isHorizontal: boolean;
}
export interface IreturnShip {
	getLength: () => number;
	hit: () => void;
	isSunk: () => boolean;
	getIsHorizontal: () => boolean;
}

function Ship(
	this: IthisShip,
	length: number,
	player: Tplayer,
	isHorizontal: boolean
): IreturnShip {
	this.length = length;
	this.player = player;
	this.hits = 0;
	this.isHorizontal = isHorizontal;

	const getLength = (): number => {
		return this.length;
	};
	const getIsHorizontal = (): boolean => {
		return this.isHorizontal;
	};

	const hit = (): void => {
		this.hits += 1;
	};

	const isSunk = (): boolean => {
		if (this.hits === this.length) return true;
		else return false;
	};

	return { getLength, getIsHorizontal, hit, isSunk };
}

export default Ship;
