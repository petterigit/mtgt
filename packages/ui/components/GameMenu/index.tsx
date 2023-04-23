interface Props {
	open: boolean;
	addPlayer: (arg0: boolean) => void;
}

export const GameMenu = (props: Props) => {
	const { open, addPlayer } = props;
	return (
		<dialog open={open}>
			<p>Add a player?</p>
			<button onClick={() => addPlayer(true)}>Yes</button>
			<button onClick={() => addPlayer(false)}>No</button>
		</dialog>
	);
};
