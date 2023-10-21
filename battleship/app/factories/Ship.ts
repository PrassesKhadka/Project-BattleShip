// Creating a Ship factory function

export interface IreturnShip {
	getLength: () => number;
	getIsHorizontal: () => boolean;
	getHits: () => number;
	hit: () => boolean;
	isSunk: () => boolean;
}

function Ship(length: number, isHorizontal: boolean): IreturnShip {
	let hits = 0;

	const getLength = (): number => {
		return length;
	};
	const getIsHorizontal = (): boolean => {
		return isHorizontal;
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

	return { getLength, getIsHorizontal, getHits, hit, isSunk };
}

export default Ship;
