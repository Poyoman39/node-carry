// @see http://www.otlet-institute.org/docs/Carry.pdf

const stepConfs = require('./stepConfs');
const { pipe } = require('./utils');

const defaultConf = {
  steps: stepConfs,
  vowels: /[aeiouäâàéèëêïîöôùüûœ]/i,
};

// count number of vowel-consonant groups
const getWordSize = (word) => {
  let isPrevVowel = false;
  let nbVCgroups = 0;

  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    const isVowel = defaultConf.vowels.test(letter);

    if (!isVowel && isPrevVowel) {
      nbVCgroups += 1;
    }

    isPrevVowel = isVowel;
  }

  return nbVCgroups;
};

const tranform = (word, stepConf) => {
  let newWord = null;

  for (
    let suffixLength = word.length - 1;
    suffixLength > 0 && !newWord;
    suffixLength -= 1
  ) {
    const suffix = word.substr(-suffixLength);
    const baseWord = word.substr(0, word.length - suffixLength);

    for (
      let minRadixSize = 0;
      minRadixSize <= 1 && !newWord;
      minRadixSize += 1
    ) {
      const transformations = stepConf[minRadixSize] || {};
      const newSuffix = transformations[suffix];

      if (newSuffix === undefined) {
        continue;
      }

      const candidate = `${baseWord}${newSuffix}`;

      if (getWordSize(candidate) > minRadixSize) {
        newWord = candidate;
        break;
      }
    }
  }

  return newWord || word;
};

function NodeCarry(userConf = defaultConf) {
  const conf = {
    ...defaultConf,
    ...userConf,
  };

  this.steps = [0, 1, 2]
    .map((iStep) => (word) => tranform(word, conf.steps[iStep]));

  this.stem = pipe(...this.steps);
};

module.exports = {
  defaultConf,
  NodeCarry,
};
