/**
 * Combines multiple classnames into a single string, filtering out falsy values.
 * Usage: cn('a', undefined, 'b', false, 'c') => 'a b c'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
