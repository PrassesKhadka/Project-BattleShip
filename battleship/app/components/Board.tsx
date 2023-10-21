import React from "react";
import { useState } from "react";
import { IreturnGameBoard, TboardData } from "../factories/Gameboard";
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

	// when onClick on the gameboard
	const shot = (i: number, j: number) => {
		setMessage(player.attack(opponent, { x: i, y: j }));
	};

	return (
		<div className="m-4">
			<div className="bg-pink-400  text-red-800 p-4 font-bold">
				<MessageBoard message={message} />
			</div>
			<div className="border-4 border-yellow-500 max-width:[300px]">
				{board.map((value: TboardData[], i) => {
					return (
						<div className="flex gap-2 border-4 border-pink-500">
							{value.map((data: TboardData, j) => {
								return (
									<div
										className="border-4 border-green-600 p-5 hover:cursor-crosshair bg-green-400"
										onClick={() => {
											shot(i, j);
										}}></div>
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
