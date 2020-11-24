# node-carry

Pure Javascript implementation of **Galileo Carry algorithm** based on http://www.otlet-institute.org/docs/Carry.pdf

Note :bangbang:: The implementation descibed in the PDF differs with the one from [the official C++ implementation](http://www.otlet-institute.org/wikics/Building_GALILEI_Platform.html#toc-Section-3). *Node-carry* follows the C++ implementation rules which gives .

## Installation

    npm i node-carry

## How to use

    const NodeCarry = require('node-carry');
    const nc = new NodeCarry();
    
    nc.stem('action') // ac
    nc.stem('acteur') // ac
    nc.stem('actrices') // ac
    nc.stem('Dleyton') // Dleyton
 
## How to use with [natural](https://www.npmjs.com/package/natural)

    const NodeCarry = require('node-carry');
    const nc = new NodeCarry();
    const Stemmer = require('natural/lib/natural/stemmers/stemmer_fr');
    
    const CarryStemmer = new Stemmer();
    CarryStemmer.stem = nc.stem;
    
    CarryStemmer.tokenizeAndStem('Le petit cheval de manège'); // ['pet', 'cheval', 'manèg']