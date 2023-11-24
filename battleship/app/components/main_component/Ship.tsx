"use client";
import React from "react";
import { useState } from "react";
import { IreturnShip } from "@/app/factories/Ship";

interface Props {
	ship: IreturnShip;
	length: number;
}

const Aship = ({ ship, length }: Props) => {
	const aShip = new Array(length).fill(1);
	console.log(aShip);

	const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
	function handleOnClick() {
		ship.isToggleDirection();
		const value = ship.getIsHorizontal();
		setIsHorizontal((prev) => value);
		console.log(ship.getIsHorizontal());
	}

	return (
		<section>
			<div
				className="inline-block m-1 "
				draggable
				onClick={() => handleOnClick()}>
				{aShip.map((value, index) => (
					<div
						key={index}
						className={`inline-block  p-4 border bg-black`}></div>
				))}
			</div>
		</section>
	);
};

export default Aship;
