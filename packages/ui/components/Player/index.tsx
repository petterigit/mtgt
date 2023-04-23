interface Props {
	name: string;
	life: number;
}

export const Player = (props: Props) => {
	const { name, life } = props;
	return (
		<div>
			<ul>
				<li>Name: {name}</li>
				<li>Life: {life}</li>
			</ul>
		</div>
	);
};
