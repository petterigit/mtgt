import { PropsWithChildren } from 'react';

import './gamecontainer.css';

export const GameContainer = (props: PropsWithChildren) => {
    const { children } = props;
    return <div className="game-container">{children}</div>;
};
