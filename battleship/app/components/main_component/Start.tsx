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
			console.log(player.getIsTurn());
		}
	}

	return (
		<div className="flex flex-wrap flex-col items-center">
			<div className="grid grid-cols-10 border mb-4">
				{board.map((value, i) =>
					value.map((data, j) =>
						data != 0 ? (
							<div
								onDragOver={(e) => allowDrop(e)}
								onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
								className="p-4 border bg-black"></div>
						) : (
							<div
								onDragOver={(e) => allowDrop(e)}
								onDrop={(e) => handleOnDragLeave(e, { x: i, y: j })}
								className="p-4 border"></div>
						)
					)
				)}
			</div>

			{/* Ships */}
			<div className="w-full h-[200px] border">
				{ships.getShips().length > 0 ? (
					ships.getShips().map((aship: IreturnShip[]) => (
						<div draggable onDragStart={(e) => handleDragStart(e, aship)}>
							{aship.map((ship: IreturnShip, i) => (
								<div
									onMouseEnter={() => (dragIndex.current = i)}
									className="p-4 border bg-black inline-block"></div>
							))}
						</div>
					))
				) : (
					<div className="flex justify-center items-center">
						<button
							onClick={() => setStart(true)}
							className="inline-block hover:cursor-pointer hover:bg-green-600 p-2 bg-green-500 mt-[20%] rounded-md text-white">
							Start
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Start;
