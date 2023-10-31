import React, { useEffect, useRef, useState } from "react";
import Player, { IreturnPlayer } from "../factories/Player";
import Board from "./main_component/Board";
import Start from "./main_component/Start";
import { IreturnGameBoard, TboardData } from "../factories/Gameboard";

const Main = () => {
	const [start, setStart] = useState<boolean>(false);

	let board1: TboardData[][] = [];
	let board2: TboardData[][] = [];

	// For player1
	const player1 = useRef(Player("Prasses"));
	const player1Gameboard = player1.current.getGameBoard();
	board1 = player1Gameboard.board;
	// player1.randomlyAddShip();
	// setting player1's turn first
	// player1.current.toggleIsTurn();

	// For player2
	const player2 = Player("Computer");
	const player2Gameboard = player2.getGameBoard();
	board2 = player2Gameboard.board;
	player2.randomlyAddShip();

	return (
		<div className="bg-white w-screen min-h-screen flex justify-center items-center">
			{!start ? (
				<Start player={player1.current} board={board1} setStart={setStart} />
			) : (
				<div className="flex flex-wrap justify-center items-center gap-12">
					<Board board={board1} player={player1.current} opponent={player2} />
					<Board board={board2} player={player2} opponent={player1.current} />
				</div>
			)}
		</div>
	);
};

export default Main;
