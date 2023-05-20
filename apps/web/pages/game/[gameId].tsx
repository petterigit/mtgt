import { useRouter } from "next/router";
import { useState } from "react";
import { GameMenu, GameMenuButton, Player } from "ui";

export const Game = () => {
	const router = useRouter();
	const { gameId } = router.query;

	const [players, setPlayers] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	const addPlayer = (confirm: boolean) => {
		setOpenModal(false);

		if (!confirm) {
			return;
		}
		const newPlayers = [...players, `player-${players.length}`];
		setPlayers(newPlayers);
	};

	return (
		<div>
			Game view for id: {gameId}
			<GameMenuButton onClick={() => setOpenModal(true)} />
			{players.map((player, i) => (
				<Player key={`player-${i}`} name={player} life={40} />
			))}
			<GameMenu open={openModal} addPlayer={addPlayer} />
		</div>
	);
};

export default Game;
