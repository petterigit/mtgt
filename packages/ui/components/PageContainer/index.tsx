import { PropsWithChildren } from 'react';

import './pagecontainer.css';

export const PageContainer = (props: PropsWithChildren) => {
    const { children } = props;
    return <div className="page-container">{children}</div>;
};
