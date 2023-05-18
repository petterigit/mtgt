import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "ui";

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

	const [gameToJoin, setGameToJoin] = useState("");

	return (
		<div>
			<h1>Web</h1>

			<ul>
				<li>
					<Button onClick={newGame}>Start a new game</Button>
				</li>

				<li
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1em",
						width: "min-content",
					}}
				>
					Join an existing game
					<input
						value={gameToJoin}
						onChange={(e) => setGameToJoin(e.target.value)}
					/>
					<Button onClick={() => joinGame(gameToJoin)}>Go</Button>
				</li>
			</ul>
		</div>
	);
};

export default Web;
