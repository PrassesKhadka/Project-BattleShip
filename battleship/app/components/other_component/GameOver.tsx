import { IreturnPlayer } from "@/app/factories/Player";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
	player: IreturnPlayer;
	opponent: IreturnPlayer;
	winner: string;
	setStart: Dispatch<SetStateAction<boolean>>;
}
const GameOver = ({ player, opponent, winner, setStart }: Props) => {
	function handleRestart() {
		player.playAgain();
		opponent.playAgain();
		// Redirects us to the Start page/component
		setStart(false);
	}

	return (
		<div className="fixed top-0 left-0 w-screen h-screen transparent backdrop-blur-[1px] flex justify-center items-center">
			<div
				className="bg-white border h-[25%] min-w-[290px] w-42%] rounded-xl shadow-md flex justify-center items-center flex-wrap flex-col gap-3 p-5 text-xl text-center uppercase font-bold
             ">
				{`GameOver, ${winner} wins the game !!!`}
				<button
					onClick={handleRestart}
					className="rounded-xl bg-blue-600 pt-1 pb-1 pl-3 pr-3 text-center text-white">
					Restart
				</button>
			</div>
		</div>
	);
};

export default GameOver;
