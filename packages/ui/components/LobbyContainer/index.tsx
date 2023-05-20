import { FormEvent, FormEventHandler } from "react";
import "./lobbycontainer.css";

export const LobbyContainer = () => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("Submit");
	};

	return (
		<form onSubmit={handleSubmit} className="lobby-container">
			<label htmlFor="game-picker">Select room</label>
			<input name="game-picker" id="game-picker"></input>
			<button type="submit">Go</button>
		</form>
	);
};
