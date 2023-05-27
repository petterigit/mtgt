import { PlayerAttributes } from 'types';

interface Props {
    name: string;
    id: string;
    life: number;
    poison: number;
    addAttribute: (id: string, attribute: PlayerAttributes, newValue: number) => void;
    removeAttribute: (id: string, attribute: PlayerAttributes, newValue: number) => void;
}

export const Player = (props: Props) => {
    const { id, name, addAttribute, removeAttribute, ...attributes } = props;

    const optionalFields: { name: PlayerAttributes; value: number }[] = [
        { name: 'life', value: attributes.life },
        { name: 'poison', value: attributes.poison },
    ];

    return (
        <div>
            <ul>
                <li>Name: {name}</li>
                {optionalFields.map(field => (
                    <li key={`players-li-${id}-${field.name}`}>
                        {field.name}: {field.value}
                    </li>
                ))}
            </ul>
            {optionalFields.map(field => (
                <div key={`players-actions-${id}-${field.name}`}>
                    <button onClick={() => addAttribute(id, field.name, field.value + 1)}>Add {field.name}</button>
                    <button onClick={() => removeAttribute(id, field.name, field.value - 1)}>
                        Remove {field.name}
                    </button>
                </div>
            ))}
        </div>
    );
};
