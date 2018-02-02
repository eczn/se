const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')


let text = fs.readFileSync('./code.txt').toString(); 

S.DEBUG = true; 

console.time('parse'.padEnd(10))
parse(text); 
console.timeEnd('parse'.padEnd(10))
