import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, LobbyContainer } from "ui";

const Web = () => {
	const router = useRouter();

	const newGame = () => {
		const randomGameID = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, "0");
		router.push(`/game/${randomGameID}`);
	};

	const joinGame = (gameID: string) => {
		router.push(`/game/${gameID}`);
	};

	return (
		<div>
			<h1>Web</h1>
			<LobbyContainer
				onSubmit={(value) => joinGame(value)}
			></LobbyContainer>
		</div>
	);
};

export default Web;
