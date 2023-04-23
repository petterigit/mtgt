import { useRouter } from "next/router";

export const Game = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>Game view for id: {id}</div>;
};

export default Game;
