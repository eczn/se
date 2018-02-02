const fs = require('then-fs')
    , sp = require('./index')
    , S = require('./S')


let text = fs.readFileSync('./code.txt').toString(); 

S.DEBUG = true; 

console.time('parse'.padEnd(10))
sp(text); 
console.timeEnd('parse'.padEnd(10))
