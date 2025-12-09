import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './button.css';
import { ReactNode } from 'react';
import { cn } from '../../util/util';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    children: ReactNode;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    primary = true,
    size = 'medium',
    backgroundColor,
    children,
    className,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'button--primary' : 'button--secondary';
    return (
        <button
            type="button"
            className={cn(className, ['button', `button--${size}`, mode].join(' '))}
            style={{ backgroundColor }}
            {...props}
        >
            {children}
        </button>
    );
};
