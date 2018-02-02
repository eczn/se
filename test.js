const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')
    , eval = require('./eval')
    , padEnd = require('string.prototype.padend')


let text = fs.readFileSync('./code.txt').toString(); 

S.DEBUG = true; 

console.time(padEnd('parse', 10))
let ast = parse(text); 
console.timeEnd(padEnd('parse', 10))

console.time(padEnd('eval', 10))
let val = eval(ast); 
console.timeEnd(padEnd('eval', 10))

console.log(padEnd('result', 9), ':', val); 

