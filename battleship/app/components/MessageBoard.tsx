import React from "react";
import { useState } from "react";
import { IreturnPlayer } from "../factories/Player";

interface Props {
	message: string;
	player: IreturnPlayer;
}

const MessageBoard = (props: Props) => {
	const { message, player } = props;
	return (
		<>
			<div className=" text-center">
				<div>
					{message
						? message.toUpperCase()
						: `${player.getName()}, This is your GameBoard`}
				</div>
			</div>
		</>
	);
};

export default MessageBoard;
