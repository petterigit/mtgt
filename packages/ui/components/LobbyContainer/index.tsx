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
            <Button className="lobby-start-button" size="large" onClick={createGame}>
                Start Session
            </Button>
            <div>
                <p>Or join an existing room width 4-digit game ID!</p>
                <form className="lobby-room-form" onSubmit={handleSubmit}>
                    <input
                        className="lobby-room-input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type={'number'}
                        placeholder="XXXX"
                        minLength={4}
                        maxLength={4}
                        required
                        pattern="\d{4}"
                        inputMode="numeric"
                    ></input>
                    <Button disabled={value.length !== 4} type="submit">
                        Go
                    </Button>
                </form>
            </div>
        </div>
    );
};
