import React from "react";
import { useState } from "react";

interface Props {
	message: string;
}

const MessageBoard = (props: Props) => {
	const { message } = props;
	return (
		<div className="flex justify-center items-center">
			{message ? message : "Let's Start the Game"}
		</div>
	);
};

export default MessageBoard;
