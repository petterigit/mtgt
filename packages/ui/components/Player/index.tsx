import { Player as PlayerType, PlayerAttribute, NumberPlayerAttribute } from 'types';
import { Button } from '../Button';

import './player.css';

interface Props extends PlayerType {
    addAttribute: <T extends PlayerAttribute>(id: string, attribute: T, newValue: PlayerType[T]) => void;
    removeAttribute: <T extends PlayerAttribute>(id: string, attribute: T, newValue: PlayerType[T]) => void;
}

export const Player = (props: Props) => {
    const { id, name, addAttribute, removeAttribute, ...attributes } = props;

    const optionalNumberFields: { name: NumberPlayerAttribute; value: number }[] = [
        { name: 'life', value: attributes.life },
    ];

    return (
        <div>
            <ul>
                <li>Name: {name}</li>
                {optionalNumberFields.map(field => (
                    <li key={`players-li-${id}-${field.name}`}>
                        {field.name}: {field.value}
                    </li>
                ))}
            </ul>
            {optionalNumberFields.map(field => (
                <div key={`players-actions-${id}-${field.name}`}>
                    <Button onClick={() => addAttribute(id, field.name, field.value + 1)}>Add {field.name}</Button>
                    <Button onClick={() => removeAttribute(id, field.name, field.value - 1)}>
                        Remove {field.name}
                    </Button>
                </div>
            ))}
        </div>
    );
};
