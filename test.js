const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')
    , eval = require('./eval')


let text = fs.readFileSync('./code.txt').toString(); 

S.DEBUG = true; 

console.time('parse'.padEnd(10))
let ast = parse(text); 
console.timeEnd('parse'.padEnd(10))

console.time('eval'.padEnd(10))
let val = eval(ast); 
console.timeEnd('eval'.padEnd(10))

console.log('result'.padEnd(10) + val); 

