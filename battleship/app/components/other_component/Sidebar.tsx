"use client";
import React from "react";

const Sidebar = () => {
	return (
		<div className="p-2 mt-2 text-white text-lg s">
			<h1 className="text-center text-2xl font-bold">How to play Battleship</h1>
			{/* Rules */}
			<div className="mt-2 mb-4 ">
				<h2 className="text-center text-xl font-bold">Rules</h2>
				<ul className="text-left">
					<li>
						The objective of Battleship is to try and sink all of the opponents
						ships before they sink all of yours. Players take turns firing shots
						to attempt to hit the enemy ships.
					</li>
					<li>
						Both players can not see the fleet of the other, you have to guess
						where is the ideal position to shoot at!
					</li>
					<li>
						When a player hits a tile that holds a ship, they can replay until
						they miss a shot.
					</li>
					<li>First player to sink all the opponents ships wins the game!</li>
				</ul>
				<p></p>
			</div>
			{/* Controls */}
			<div>
				<h2 className="text-center text-xl font-bold">Controls</h2>
				<ul>
					<li>
						Before starting, you need to place all your ships on the board. To
						do that, you can:
						<li>
							<em className="bg-blue-600 p-[5px] rounded-xl inline-block">
								Drag and drop
							</em>{" "}
							the ships on the board (single click to rotate them)
						</li>
						<li>
							Press
							<em className="bg-blue-600 p-[5px] rounded-xl inline-block">
								random
							</em>
							to place your ships randomly{" "}
						</li>
					</li>
					<li>Once that is done, press start and try to defeat the AI!</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
