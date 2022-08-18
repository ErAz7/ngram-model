# N-Gram Model [![npm-shield]][npm] ![ts-shield]
> JavaScript implementation of N-gram model for text generation

## Installation

```
npm i ngram-model
```
or
```
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
NGram.train('EVEN MORE TRAINER TEXT');

// guess next 3 tokens, based on the experience from training
NGram.guess('Hello there', 3);

// guess as many next tokens as possible, based on the experience from training
NGram.guess('Hello there');

// guess as many next tokens as possible, the starting text is up to what the 
// model has seen on training texts
NGram.guess();
```

[npm]: https://www.npmjs.com/package/ngram-model
[npm-shield]: https://img.shields.io/badge/npm-1.0.0-green?style=flat-square
[ts-shield]: https://img.shields.io/badge/TypeScript-blue?style=flat-square
