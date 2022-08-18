export const PUNCTUATION_MARKS = [
    '.',
    ',',
    ';',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '?',
    '!',
    '"',
    "'",
];

export const PUNCTUATION_REGEX = PUNCTUATION_MARKS.reduce(
    (total: { [key: string]: RegExp }, punctuation) => {
        total[punctuation] = new RegExp(`\\${punctuation}`, 'g');

        return total;
    },
    {}
);

export const START_TOKEN = '<START>';
