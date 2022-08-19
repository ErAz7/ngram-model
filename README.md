# N-Gram Model [![npm-shield]][npm] ![ts-shield]
> JavaScript implementation of N-Gram model for text generation. You can train the model and it can guess next N tokens of a token sequence.

## Installation

```bash
npm i ngram-model
```
or
```bash
yarn add ngram-model
```

## Usage

```ts
import NGramModel from 'ngram-model';

// create a 4-gram model
const NGram = new NGramModel(4);

// pass the model a long text to learn
NGram.train('SOME LONG TRAINER TEXT');

// train more...
NGram.train('EVEN MORE TRAINING');

// guess next 3 tokens, based on the experience from training
NGram.guess('I need a', 3);

// guess as many next tokens as possible, based on the experience from training
NGram.guess('She is');

// guess as many next tokens as possible, the starting text is up to what the 
// model has seen on training texts
NGram.guess();
```

### new NGramModel(N)
- `N` `number` N in N-gram model

Creates an N-Gram model

### NGram.train(text)
- `text` `<string>` text to train the model

Trains the model using a training text


### NGram.guess([starterText[, tokenCount]])
- `starterText` `<string>` starter text to be used for guessing next tokens
- `tokenCount` `<number>` maximum number of tokens to be guessed
- **Returns:** `<string[]>` array of guessed tokens

Guesses next tokens of the sequence based on experience from trainings (**will throw error if no training is done before**)


[npm]: https://www.npmjs.com/package/ngram-model
[npm-shield]: https://img.shields.io/badge/npm-1.0.0-green?style=flat-square
[ts-shield]: https://img.shields.io/badge/TypeScript-blue?style=flat-square
