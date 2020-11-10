// @see http://www.otlet-institute.org/docs/Carry.pdf

const { pipe } = require('./utils');

const defaultConf = {
  steps: [
    // === Step 1
    [
      // Transformations with 1 as minimal radix
      {
        issaient: '',
        issement: '',
        eraient: '',
        iraient: '',
        eassent: '',
        ussent: '',
        amment: '',
        emment: '',
        issant: '',
        issent: '',
        assent: '',
        eaient: '',
        issait: '',
        èrent: '',
        erent: '',
        irent: '',
        erait: '',
        irait: '',
        iront: '',
        eront: '',
        ement: '',
        aient: '',
        îrent: '',
        eont: '',
        eant: '',
        eait: '',
        ient: '',
        ent: '',
        ont: '',
        ant: '',
        eât: '',
        ait: '',
        at: '',
        ât: '',
        it: '',
        ît: '',
        t: '',
        uction: '',
        itude: '',
        ade: '',
        isme: '',
        age: '',
        trice: '',
        elle: '',
        able: '',
        iste: '',
        ette: '',
        itée: '',
        ité: '',
        té: '',
        ée: '',
        é: '',
        usse: '',
        aise: '',
        ate: '',
        ite: '',
        ee: '',
        e: '',
        issements: '',
        issantes: '',
        eassions: '',
        eresses: '',
        issions: '',
        assions: '',
        issants: '',
        ussions: '',
        ements: '',
        eantes: '',
        issons: '',
        assons: '',
        easses: '',
        études: '',
        etudes: '',
        itudes: '',
        issais: '',
        irions: '',
        erions: '',
        usses: '',
        tions: '',
        ances: '',
        entes: '',
        eants: '',
        ables: '',
        irons: '',
        irais: '',
        ences: '',
        ients: '',
        ieres: '',
        eures: '',
        aires: '',
        erons: '',
        esses: '',
        euses: '',
        cques: '',
        elles: '',
        istes: '',
        aises: '',
        asses: '',
        isses: '',
        ières: '',
        eries: '',
        antes: '',
        ismes: '',
        erais: '',
        eâtes: '',
        eâmes: '',
        itées: '',
        ettes: '',
        ages: '',
        eurs: '',
        ents: '',
        ètes: '',
        etes: '',
        ions: '',
        ités: '',
        îtés: '',
        iers: '',
        iras: '',
        eras: '',
        ants: '',
        îmes: '',
        ûmes: '',
        âmes: '',
        ades: '',
        eais: '',
        eons: '',
        ttes: '',
        îtes: '',
        tés: '',
        ons: '',
        ais: '',
        ées: '',
        ees: '',
        ats: '',
        eas: '',
        ts: '',
        rs: '',
        as: '',
        es: '',
        és: '',
        is: '',
        s: '',
        ea: '',
        au: '',
        ition: '',
        tion: '',
        er: '',
        ir: '',
        r: '',
        eassiez: '',
        issiez: '',
        assiez: '',
        ussiez: '',
        issez: '',
        assez: '',
        eriez: '',
        iriez: '',
        erez: '',
        irez: '',
        iez: '',
        ez: '',
        erai: '',
        irai: '',
        eai: '',
        ai: '',
        i: '',
        ira: '',
        era: '',
        a: '',
        eux: '',
        x: '',
        issante: '',
        eresse: '',
        eante: '',
        easse: '',
        eure: '',
        esse: '',
        asse: '',
        ance: '',
        ence: '',
        euse: '',
        oise: '',
        isse: '',
        ante: '',
        ière: '',
        ete: '',
        ète: '',
        iere: '',
        erie: '',
        étude: '',
        etude: '',
        ellement: 'el',
        alement: 'al',
        f: 'v ',
        yeux: 'oeil ',
        aux: 'al ',
        ouse: 'ou ',
        cque: 'c',
        que: 'c',
        eille: 'eil',
        ulle: 'ul',
        gue: 'g',
        nne: 'n',
        ulles: 'ul',
        oises: 'o',
        ouses: 'ou',
        ques: 'c',
        gues: 'g',
        nnes: 'n',
        fs: 'v',
      },

      // Transformations with 2 as minimal radix
      {
        ication: '',
        iation: '',
        ation: '',
        ications: '',
        iations: '',
        ateurs: '',
        ations: '',
        teurs: '',
        ures: '',
      },
    ],

    // === Step 2
    [
      {
        i: '',
      },

      {
        ent: '',
        ation: '',
        ition: '',
        tion: '',
        el: '',
      },
    ],

    // === Step 3
    [
      {
        nn: 'n',
        ll: 'l',
        tt: 't',
        y: '',
        t: '',
        qu: 'c',
        gu: 'g',
        issaient: '',
        ellement: 'el',
        issement: '',
        alement: 'al',
        eraient: '',
        iraient: '',
        eassent: '',
        ussent: '',
        amment: '',
        emment: '',
        issant: '',
        issent: '',
        assent: '',
        eaient: '',
        issait: '',
      },
    ],
  ],
};

const vowels = /[aeiouäâàéèëêïîöôùüûœ]/i;

// count number of vowel-consonant groups
const getWordSize = (word) => {
  let isPrevVowel = false;
  let nbVCgroups = 0;

  for (let i = 0; i < word.length; i += 1) {
    const letter = word[i];
    const isVowel = vowels.test(letter);

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
      const transformations = stepConf[minRadixSize];
      const newSuffix = transformations[suffix];

      const candidate = `${baseWord}${newSuffix}`;

      if (getWordSize(candidate) > minRadixSize) {
        newWord = candidate;
        break;
      }
    }
  }

  return newWord || word;
};

const NodeCarry = function NodeCarry(userConf = defaultConf) {
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
