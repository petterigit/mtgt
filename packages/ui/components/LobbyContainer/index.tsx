import React from 'react';
import { FormEvent, useState } from 'react';
import './lobbycontainer.css';
import { Button } from '../Button';

interface Props {
    joinGame: (gameID: string) => void;
    createGame: () => void;
}

export const LobbyContainer = (props: Props) => {
    const { createGame, joinGame } = props;

    const [value, setValue] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinGame(value);
    };

    return (
        <div className="lobby-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="game-picker">Select room</label>
                <input
                    value={value}
                    name="game-picker"
                    id="game-picker"
                    onChange={e => setValue(e.target.value)}
                ></input>
                <Button type="submit">Go</Button>
            </form>
            <Button onClick={createGame}>Create game</Button>
        </div>
    );
};
