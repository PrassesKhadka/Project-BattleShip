import React, { useEffect } from "react";
import { useState } from "react";
import {
	Ilocation,
	IreturnGameBoard,
	TboardData,
} from "../../factories/Gameboard";
import { IreturnPlayer } from "../../factories/Player";
import MessageBoard from "./MessageBoard";

interface Props {
	board: TboardData[][];
	player: IreturnPlayer;
	opponent: IreturnPlayer;
}

const Board = (props: Props) => {
	const { board, player, opponent } = props;
	const [message, setMessage] = useState<string>("");
	const [hitIndex, setHitIndex] = useState<Ilocation[]>([]);
	const [missIndex, setMissIndex] = useState<Ilocation[]>([]);

	const [count, setCount] = useState<boolean>(false);

	useEffect(() => {
		//Every second this useEffect will run
		const intervalId = setInterval(() => {
			setCount((prevCount) => !prevCount);
		}, 1000);

		if (opponent.getName() === "Computer" && opponent.getIsTurn() === true) {
			const result = opponent.randomlyHitShip(player);
			if (typeof result === "object") {
				const i = result.randomLocation.x;
				const j = result.randomLocation.y;
				if (player.getGameBoard().board[i][j] != 0) {
					setHitIndex((prev) => [...prev, { x: i, y: j }]);
				} else {
					setMissIndex((prev) => [...prev, { x: i, y: j }]);
				}
				console.log(message);
				setMessage((prev) => (prev = `Computer, ${result.value}`));
				console.log(message);
			}
		}
	}, [count]);

	// when onClick on the gameboard
	function shot(i: number, j: number): void {
		if (opponent.getName() != "Computer" && opponent.getIsTurn() === true) {
			if (player.getGameBoard().board[i][j] != 0) {
				setHitIndex((prev) => [...prev, { x: i, y: j }]);
			} else {
				setMissIndex((prev) => [...prev, { x: i, y: j }]);
			}
			//after every attack, player turn toggles
			const message = opponent.attack(player, { x: i, y: j });
			setMessage(message);
		}
	}

	return (
		<div className=" border-black border-2 ">
			{/* <div className="bg-[#222222] font-semibold text-white p-4 text-l border-b-2 border-b-black ">
				<MessageBoard message={message} player={player} />
			</div> */}
			<div className="">
				{board.map((value: TboardData[], i) => {
					return (
						<div className="grid grid-cols-10 gap-0">
							{value.map((data: TboardData, j) => {
								return (
									<div
										className="w-[35px] h-[35px] hover:cursor-crosshair bg-blue-300 border"
										onClick={() => {
											shot(i, j);
										}}>
										{hitIndex.some((element) => {
											if (element.x === i && element.y === j) {
												return true;
											} else {
												return false;
											}
										}) ? (
											<div className="w-full h-full hover:cursor-not-allowed bg-slate-800"></div>
										) : missIndex.some((element) => {
												if (element.x === i && element.y === j) {
													return true;
												} else {
													return false;
												}
										  }) ? (
											<div className="w-full h-full hover:cursor-not-allowed bg-gradient-to-r from-cyan-200 to-cyan-400"></div>
										) : (
											<div></div>
										)}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Board;
