import React from "react";
import { FormEvent, useState } from "react";
import "./lobbycontainer.css";

interface Props {
	onSubmit: (value: string) => void;
}

export const LobbyContainer = (props: Props) => {
	const { onSubmit } = props;

	const [value, setValue] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onSubmit(value);
	};

	return (
		<form onSubmit={handleSubmit} className="lobby-container">
			<label htmlFor="game-picker">Select room</label>
			<input
				value={value}
				name="game-picker"
				id="game-picker"
				onChange={(e) => setValue(e.target.value)}
			></input>
			<button type="submit">Go</button>
		</form>
	);
};
