import Link from "next/link";
import { Button } from "ui";

export default function Web() {
	return (
		<div>
			<h1>Web</h1>
			<Button label="Boop" />
			<ul>
				<li>
					<Link href="/game/123">Go to game 123</Link>
				</li>

				<li>
					<Link href="/game">Go to games index</Link>
				</li>
			</ul>
		</div>
	);
}
