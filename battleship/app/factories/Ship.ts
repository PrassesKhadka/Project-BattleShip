// Creating a Ship factory function

export interface IreturnShip {
	getLength: () => number;
	getIsHorizontal: () => boolean;
	getHits: () => number;
	hit: () => boolean;
	isSunk: () => boolean;
	isToggleDirection: () => void;
}

function Ship(length: number, isHorizontal: boolean): IreturnShip {
	let hits = 0;
	length = length;
	isHorizontal = isHorizontal;

	const getLength = (): number => {
		return length;
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
		getIsHorizontal,
		getHits,
		hit,
		isSunk,
		isToggleDirection,
	};
}

export default Ship;
