const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')
    , eval = require('./eval')
    , padEnd = require('string.prototype.padend')
    , padStart = require('string.prototype.padStart')


let text = fs.readFileSync('./code.txt').toString(); 

// S.DEBUG = true; 

console.time(padStart('parse  ', 11))
let ast = parse(text); 
console.timeEnd(padStart('parse  ', 11))

console.time(padStart('eval  ', 11))
let val = eval(ast); 
console.timeEnd(padStart('eval  ', 11))

console.log(padStart('result ', 10), ':', val); 



