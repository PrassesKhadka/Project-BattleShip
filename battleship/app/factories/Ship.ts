// Creating a Ship factory function

export interface IreturnShip {
	getLength: () => number;
	getColor: () => Tcolor;
	getIsHorizontal: () => boolean;
	getHits: () => number;
	hit: () => boolean;
	isSunk: () => boolean;
	isToggleDirection: () => void;
}

export type Tcolor = "red" | "green" | "blue" | "orange" | "pink";

function Ship(
	length: number,
	isHorizontal: boolean,
	color: Tcolor
): IreturnShip {
	// Private datas:
	let hits = 0;
	length = length;
	color = color;
	isHorizontal = isHorizontal;

	const getLength = (): number => {
		return length;
	};
	const getColor = (): Tcolor => {
		return color;
	};
	const getIsHorizontal = (): boolean => {
		return isHorizontal;
	};
	const isToggleDirection = (): void => {
		isHorizontal = !isHorizontal;
	};
	const getHits = (): number => {
		return hits;
	};
	const hit = (): boolean => {
		hits++;
		return true;
	};

	const isSunk = (): boolean => {
		if (hits === length) {
			return true;
		} else {
			return false;
		}
	};

	return {
		getLength,
		getColor,
		getIsHorizontal,
		getHits,
		hit,
		isSunk,
		isToggleDirection,
	};
}

export default Ship;
