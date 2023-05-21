import { ComponentPropsWithoutRef } from 'react';
import { ButtonHTMLAttributes } from 'react';

export const GameMenuButton = (props: ComponentPropsWithoutRef<'button'>) => {
    return <button {...props}>Open menu</button>;
};
