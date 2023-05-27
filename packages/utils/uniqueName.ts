import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';

export const createUniqueName = () => {
    const randomName = uniqueNamesGenerator({ dictionaries: [names, adjectives], separator: ', the ' });
    return randomName;
};
