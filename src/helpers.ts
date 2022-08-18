import { PUNCTUATION_MARKS, PUNCTUATION_REGEX, START_TOKEN } from './config';
import type { NGramType } from './';

export const getTokens = (str: string) => {
    let strSpaced: string = str;

    for (const punctuation of PUNCTUATION_MARKS) {
        strSpaced = strSpaced.replace(
            PUNCTUATION_REGEX[punctuation],
            ` ${punctuation} `
        );
    }

    strSpaced = strSpaced.replace(/ {2,}/g, ' ').trim();

    const tokens: string[] = strSpaced.split(' ');

    return tokens.map(item => item.trim()).filter(item => !!item);
};

export const getNgrams = (
    n: number,
    str: string,
    onGramFound: (gram: NGramType) => void
) => {
    const tokens = getTokens(str);
    const filler = Array(n - 1).fill(START_TOKEN);

    const filledTokens = filler.concat(tokens);
    const tokensCount = filledTokens.length;

    for (let i = 0; i <= tokensCount - n; i++) {
        const nTokens = filledTokens.slice(i, i + n);
        const gram = {
            current: nTokens.slice(0, n - 1),
            next: nTokens[nTokens.length - 1],
        };

        onGramFound(gram);
    }
};
