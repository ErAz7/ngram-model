import { getNgrams, getTokens } from './helpers';
import { START_TOKEN } from './config';

export type TokenType = string;
export type CurrentTokensType = TokenType[];
export type NGramType = { current: CurrentTokensType; next: TokenType };
export type ExperienceType = {
    [key: string]: {
        candidates: { [key: string]: { original: TokenType; count: number } };
        total: number;
    };
};

export default class NGram {
    n: number;
    experience: ExperienceType;

    constructor(n: number) {
        this.n = n;
        this.experience = {};
    }

    tokensToKey(tokens: CurrentTokensType) {
        return tokens.join(' ').toLowerCase();
    }

    getExperience(currentTokens: CurrentTokensType) {
        const key = this.tokensToKey(currentTokens);

        return this.experience[key];
    }

    addExperience(gram: NGramType) {
        const { current, next } = gram;

        const key = this.tokensToKey(current);
        const nextKey = next.toLowerCase();

        if (!this.experience[key]) {
            this.experience[key] = { candidates: {}, total: 0 };
        }

        if (!this.experience[key].candidates[nextKey]) {
            this.experience[key].candidates[nextKey] = {
                original: next,
                count: 0,
            };
        }

        this.experience[key].candidates[nextKey].count++;
        this.experience[key].total++;
    }

    getNextToken(currentTokens: CurrentTokensType) {
        const experience = this.getExperience(currentTokens);

        if (!experience) {
            return false;
        }

        const { candidates, total } = experience;
        const random = Math.random();
        let probSum = 0;

        for (const candidate in candidates) {
            const prob = candidates[candidate].count / total;

            probSum += prob;

            if (probSum >= random) {
                return candidate;
            }
        }
    }

    train(str: string) {
        const sentences = str.replace(/\.{2,}/g, ' ').split('.');

        sentences.forEach(sentence =>
            getNgrams(this.n, sentence, gram => {
                this.addExperience(gram);
            })
        );
    }

    guess(starter = '', length = 0) {
        if (!Object.keys(this.experience).length) {
            throw new Error('No experience, should train first');
        }

        const starterTokens = getTokens(starter);
        const result: string[] = Array(this.n - 1)
            .fill(START_TOKEN)
            .concat(starterTokens);

        /* eslint-disable no-unmodified-loop-condition */
        while (
            length === 0 ||
            result.length - (this.n - 1) - starterTokens.length < length
        ) {
            const nextToken = this.getNextToken(result.slice(-(this.n - 1)));

            if (!nextToken) {
                break;
            }

            result.push(nextToken);
        }

        return result.slice(this.n - 1 + starterTokens.length);
    }
}
