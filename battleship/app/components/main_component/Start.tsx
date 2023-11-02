"use client";
import { IreturnPlayer } from "@/app/factories/Player";
import { Ilocation, TboardData } from "@/app/factories/Gameboard";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Ship, { IreturnShip } from "@/app/factories/Ship";
import Aship from "./Ship";
import { useState } from "react";
import ShipDrag from "@/app/factories/DragNDrop";
import { IreturnShipDrag } from "@/app/factories/DragNDrop";

interface Props {
	player: IreturnPlayer;
	board: TboardData[][];
	setStart: Dispatch<SetStateAction<boolean>>;
}
const Start = ({ player, board, setStart }: Props) => {
	// Just to cause the rerenders
	const [state, setState] = useState<boolean>(false);
	const shipsRef = useRef<IreturnShipDrag>(ShipDrag(player));
	const ships = shipsRef.current;

<<<<<<< HEAD
=======
	// Creating ships on first render
	useState(() => {
		//creating ships
		ships.createShips();
	}, []);

>>>>>>> 1a8c92c7f74137f07d87a3ba61ed75fc56c6d3ba
	const [horizontal, setHorizontal] = useState<boolean>(true);

	const draggedItem = useRef<IreturnShip | undefined>();
	const dragIndex = useRef<number>(0);

	function handleDragStart(e: React.DragEvent, aship: IreturnShip[]) {
		// if length=2 then [ship,ship]
		draggedItem.current = aship[0];
	}

	function allowDrop(e: React.DragEvent) {
		e.stopPropagation();
		e.preventDefault();
	}

	function handleOnDragLeave(e: React.DragEvent, location: Ilocation) {
		e.preventDefault();

		// console.log(location.x, location.y);
		const onDragLeaveLocation = location;
		if (draggedItem?.current) {
			const result = ships.placeValid(
				draggedItem.current,
				dragIndex.current,
				onDragLeaveLocation
			);
			if (result) {
				setState((prev) => !prev);
			}
			// console.log(player.getIsTurn());
		}
	}

	function handleRandomClick() {
		// first clear the gameboard and then randomlyAddShip
		player.getGameBoard().reset();
		player.randomlyAddShip();
		// to remove the ships on the side
		ships.getShips().length = 0;
		// To make this component rerender again
		setState((prev) => !prev);
	}

	function handleResetClick() {
		// first remove all the ships and then createShips
		ships.removeAllShips();
		// reset the gameboard
		player.getGameBoard().reset();
		// and make the ships on the side available
		ships.createShips();
		// make this component rerender again
		setState((prev) => !prev);
	}

	return (
		<div className="flex flex-wrap justify-center min-h-screen w-screen items-center">
			{/* player's board to drag and drop to place the ship */}
			<div className="flex flex-col ">
				{/* board */}
				<div className=" grid grid-cols-10 border-2 border-blue-700 m-5 ">
					{board.map((value, i) =>
						value.map((data, j) =>
							data != 0 ? (
								<div
									onDragOver={(e) => allowDrop(e)}
									onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
									className="p-4 border border-blue-500 bg-blue-100 "></div>
							) : (
								<div
									onDragOver={(e) => allowDrop(e)}
									onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
									className="p-4 border  border-slate-300"></div>
							)
						)
					)}
				</div>

				{/* button */}
<<<<<<< HEAD
				<div className="flex justify-evenly p-1 text-white">
					<button
						onClick={() => handleRandomClick()}
						className="bg-blue-500 hover:bg-blue-400 pr-4 pl-4 pt-1 pb-1 rounded-xl border">
=======
				<div className="flex justify-evenly p-1">
					<button
						onClick={() => handleRandomClick()}
						className="bg-blue-400 hover:bg-blue-500 pr-4 pl-4 pt-1 pb-1 rounded-xl border">
>>>>>>> 1a8c92c7f74137f07d87a3ba61ed75fc56c6d3ba
						random
					</button>
					<button
						onClick={() => handleResetClick()}
<<<<<<< HEAD
						className="bg-blue-500 hover:bg-blue-400 pr-4 pl-4 pt-1 pb-1 rounded-xl border">
=======
						className="bg-blue-400 hover:bg-blue-500 pr-4 pl-4 pt-1 pb-1 rounded-xl border">
>>>>>>> 1a8c92c7f74137f07d87a3ba61ed75fc56c6d3ba
						reset
					</button>
				</div>
			</div>

			{/* Ships */}
			<div className=" h-[350px] w-[300px] flex flex-col items-center justify-center gap-2">
				{ships.getShips().length > 0 ? (
					ships.getShips().map((aship: IreturnShip[]) => (
						<div
							draggable
							onDragStart={(e) => handleDragStart(e, aship)}
							className="">
							{aship.map((ship: IreturnShip, i) => (
								<div
									onMouseEnter={() => (dragIndex.current = i)}
									onClick={() => {
										aship[i].isToggleDirection();
										setHorizontal((prev) => !prev);
									}}
									className={`inline-block p-4 w-[30px]  border border-blue-500 bg-blue-100  hover:cursor-grab hover:bg-blue-200 ${
										!aship[i].getIsHorizontal() ? "flex" : ""
									}`}></div>
							))}
						</div>
					))
				) : (
					<div className="flex justify-center items-center">
						<button
							onClick={() => {
								setStart(true);
								player.toggleIsTurn();
							}}
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
							Start
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Start;
