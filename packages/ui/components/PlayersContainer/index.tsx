import { PropsWithChildren } from 'react';

import './playerscontainer.css';

export const PlayersContainer = (props: PropsWithChildren) => {
    const { children } = props;
    return <div className="players-container">{children}</div>;
};
