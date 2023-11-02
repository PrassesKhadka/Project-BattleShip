import React from "react";

interface Props {
	winner: string;
}
const GameOver = ({ winner }: Props) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen transparent backdrop-blur-[1px] flex justify-center items-center">
			<div
				className="bg-slate-100 border h-[25%] min-w-[290px] w-42%] rounded-xl shadow-md flex justify-center items-center flex-wrap flex-col gap-3 p-5 text-xl text-center uppercase font-bold
             ">
				{`GameOver, ${winner} wins the game !!!`}
				<button className="rounded-xl bg-blue-600 pt-1 pb-1 pl-3 pr-3 text-center text-white">
					Restart
				</button>
			</div>
		</div>
	);
};

export default GameOver;
