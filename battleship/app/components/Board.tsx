import React from "react";
import { useState } from "react";
import {
	Ilocation,
	IreturnGameBoard,
	TboardData,
} from "../factories/Gameboard";
import { IreturnPlayer } from "../factories/Player";
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

	// when onClick on the gameboard
	const shot = (i: number, j: number) => {
		setMessage(opponent.attack(player, { x: i, y: j }));
		setHitIndex(player.getGameBoard().hitIndex);
		setMissIndex(player.getGameBoard().missIndex);
	};

	return (
		<div className="mt-4 border-black border-4 max-w-[90%]">
			<div className="bg-pink-400 text-red-800 p-4 font-bold border-b-4 border-b-black ">
				<MessageBoard message={message} />
			</div>
			<div className="p-1 m-1">
				{board.map((value: TboardData[], i) => {
					return (
						<div className="flex mt-2">
							{value.map((data: TboardData, j) => {
								return (
									<div
										className="border-4 border-blue-400 m-1 w-[35px] h-[35px] hover:cursor-crosshair bg-blue-300"
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
											<div className="w-full h-full border-4 border-green-400  hover:cursor-not-allowed bg-green-300"></div>
										) : missIndex.some((element) => {
												if (element.x === i && element.y === j) {
													return true;
												} else {
													return false;
												}
										  }) ? (
											<div className="w-full h-full border-4 border-red-400  hover:cursor-not-allowed bg-red-300"></div>
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
