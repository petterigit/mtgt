import { Player as PlayerType, PlayerAttribute, NumberPlayerAttribute } from 'types';
import { Button } from '../Button';

import './player.css';

interface Props extends PlayerType {
    removePlayer: () => void;
    addAttribute: <T extends PlayerAttribute>(id: string, attribute: T, newValue: PlayerType[T]) => void;
    removeAttribute: <T extends PlayerAttribute>(id: string, attribute: T, newValue: PlayerType[T]) => void;
}

export const Player = (props: Props) => {
    const { id, name, addAttribute, removeAttribute, removePlayer, ...attributes } = props;

    const optionalNumberFields: { name: NumberPlayerAttribute; value: number }[] = [
        { name: 'life', value: attributes.life },
    ];

    return (
        <div className="player-card">
            <div className="player-card-header">
                <h2 className="player-card-name">{name}</h2>
                <Button onClick={removePlayer} primary={false} size="small">
                    X
                </Button>
            </div>
            <div>
                {optionalNumberFields.map(field => (
                    <div className="player-field" key={`players-li-${id}-${field.name}`}>
                        <h3 className="player-field-label">
                            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                        </h3>
                        <div className="attribute-label">
                            <b>{field.value}</b>
                        </div>
                        <div className="attribute-buttons">
                            <Button
                                primary={false}
                                size="small"
                                onClick={() => removeAttribute(id, field.name, field.value - 1)}
                            >
                                - 1
                            </Button>
                            <Button
                                primary={false}
                                size="small"
                                onClick={() => addAttribute(id, field.name, field.value + 1)}
                            >
                                + 1
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
