"use client";
import { IreturnPlayer } from "@/app/factories/Player";
import { Ilocation, TboardData } from "@/app/factories/Gameboard";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Ship, { IreturnShip } from "@/app/factories/Ship";
import Aship from "./Ship";
import { useState } from "react";
import ShipDrag from "@/app/factories/DragNDrop";
import { IreturnShipDrag } from "@/app/factories/DragNDrop";

// for dynamic colors in tailwind: we just have to declare this that's it !!!
const dynamicBg = [
	"bg-red-100",
	"bg-blue-100",
	"bg-green-100",
	"bg-orange-100",
	"bg-pink-100",
];
const dynamicHover = [
	"bg-red-200",
	"bg-blue-200",
	"bg-green-200",
	"bg-orange-200",
	"bg-pink-200",
];
const dynamicBorder = [
	"border-red-500",
	"border-blue-500",
	"border-green-500",
	"border-orange-500",
	"border-pink-500",
];

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
		<div className="flex flex-col justify-evenly ml-[5%] mr-[5%] mt-8">
			{/* header div */}
			<header>
				<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-black text-center">{`${player.getName()}, place your ships.You can click on the ships to toggle directions`}</h1>
			</header>

			{/* Main div */}
			<div className="flex flex-wrap justify-center items-center ">
				{/* player's board to drag and drop to place the ship */}
				<div className="flex flex-col ">
					{/* board */}
					<div className=" grid grid-cols-10 border-2 border-blue-700 m-5 ">
						{board.map((value, i) =>
							value.map((data, j) =>
								data != 0 ? (
									<div
										key={j}
										onDragOver={(e) => allowDrop(e)}
										onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
										className={`p-4 border border-${data.getColor()}-500 bg-${data.getColor()}-100`}></div>
								) : (
									<div
										key={j}
										onDragOver={(e) => allowDrop(e)}
										onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
										className="p-4 border  border-slate-300"></div>
								)
							)
						)}
					</div>

					{/* button */}
					<div className="flex justify-evenly p-1 text-white">
						<button
							onClick={() => handleRandomClick()}
							className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Random
						</button>
						<button
							onClick={() => handleResetClick()}
							className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Reset
						</button>
					</div>
				</div>

				{/* Ships */}
				<div className=" h-[350px] w-[300px] flex flex-col items-center justify-center gap-2">
					{ships.getShips().length > 0 ? (
						ships.getShips().map((aship: IreturnShip[], index) => (
							<div
								key={index}
								draggable
								onDragStart={(e) => handleDragStart(e, aship)}
								className="">
								{aship.map((ship: IreturnShip, i) => (
									<div
										key={i}
										onMouseEnter={() => (dragIndex.current = i)}
										onClick={() => {
											aship[i].isToggleDirection();
											setHorizontal((prev) => !prev);
										}}
										className={`inline-block p-4 w-[30px]  border border-${ship.getColor()}-500 bg-${ship.getColor()}-100  hover:cursor-grab hover:bg-${ship.getColor()}-200 ${
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
								className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
								Start
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Start;
