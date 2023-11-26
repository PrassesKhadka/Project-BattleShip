import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import {
	Ilocation,
	IreturnGameBoard,
	TboardData,
} from "../../factories/Gameboard";
import { IreturnPlayer } from "../../factories/Player";
import MessageBoard from "./MessageBoard";
import GameOver from "../other_component/GameOver";
    
// for dynamic colors in tailwind: we just have to declare this that's it !!!
const dynamicBg = [
	"bg-red-500",
	"bg-blue-500",
	"bg-green-500",
	"bg-orange-500",
	"bg-pink-500",
];

interface Props {
	board: TboardData[][];
	player: IreturnPlayer;
	opponent: IreturnPlayer;
	setStart: Dispatch<SetStateAction<boolean>>;
}

const Board = (props: Props) => {
	const { board, player, opponent, setStart } = props;
	// console.log(player);
	// console.log(player.getIsTurn());
	const [message, setMessage] = useState<string>("");
	const [hitIndex, setHitIndex] = useState<Ilocation[]>([]);
	const [missIndex, setMissIndex] = useState<Ilocation[]>([]);

	const [count, setCount] = useState<boolean>(false);

	useEffect(() => {
		//Every half second this useEffect will run
		const intervalId = setInterval(() => {
			setCount((prevCount) => !prevCount);
		}, 500);

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
				// console.log(message);

				setMessage((prev) => (prev = `Computer, ${result.value}`));
				// console.log(message);
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
			// console.log(opponent.getGameBoard().board);
		}
	}

	return (
		<div>
			{/* GameOver */}
			{/* player gameboard allSunk then opponent wins */}
			{player.getGameBoard().allShipSunk() ? (
				<GameOver
					player={player}
					opponent={opponent}
					setStart={setStart}
					winner={opponent.getName()}
				/>
			) : null}

			{/* Message Board */}
			<div className="bg-white font-semibold text-black px-2 py-8 ">
				<MessageBoard message={message} player={player} />
			</div>

			{/* GameBoard */}
			<div className="border-2 border-blue-700">
				{board.map((value: TboardData[], i) => {
					return (
						<div key={i} className="grid grid-cols-10 gap-0">
							{value.map((data: TboardData, j) => {
								return (
									<div
										key={j}
										className="w-[45px] h-[40px] hover:cursor-crosshair bg-white border border-slate-300"
										onClick={() => {
											shot(i, j);
										}}>
										{hitIndex.some((element) =>
											element.x === i && element.y === j ? true : false
										) ? (
											<div
												className={`w-full h-full hover:cursor-not-allowed text-center bg-${
													typeof data === "object" && data.getColor()
												}-500`}>
												<span className="text-xl text-white mt-[5px] inline-block">x</span>
											</div>
										) : missIndex.some((element) =>
												element.x === i && element.y === j ? true : false
										  ) ? (
											<div className="w-full h-full hover:cursor-not-allowed flex justify-center items-center">
												<div className="w-3 h-3 bg-black rounded-full"></div>
											</div>
										) : (
											<div className=""></div>
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
