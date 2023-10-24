import React, { useEffect, useState } from "react";
import Player from "../factories/Player";
import Board from "./main_component/Board";
import { IreturnGameBoard, TboardData } from "../factories/Gameboard";

const Main = () => {
	useEffect(() => {});
	let board1: TboardData[][] = [];
	let board2: TboardData[][] = [];

	// For player1
	const player1 = Player("Prasses");
	const player1Gameboard = player1.getGameBoard();
	board1 = player1Gameboard.board;
	player1.randomlyAddShip();
	// setting player1's turn first
	player1.toggleIsTurn();

	// For player2
	const player2 = Player("Computer");
	const player2Gameboard = player2.getGameBoard();
	board2 = player2Gameboard.board;
	player2.randomlyAddShip();

	return (
		<div className=" bg-[#5E5E5E] w-screen min-h-screen flex justify-center items-center">
			{/* Board wrapper */}
			<div className="flex flex-wrap justify-center items-center gap-5">
				<Board board={board1} player={player1} opponent={player2} />
				<Board board={board2} player={player2} opponent={player1} />
			</div>
		</div>
	);
};

export default Main;
