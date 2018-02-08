const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')
    , eval = require('./eval')
    , padEnd = require('string.prototype.padend')
    , padStart = require('string.prototype.padStart')


let text = fs.readFileSync('./code.se').toString(); 

// S.DEBUG = true; 

console.time(padStart('parse  ', 11))
let ast = parse(text); 
console.timeEnd(padStart('parse  ', 11))

console.log('- SE Log Start ----------------', '\n\n'); 
console.time(padStart('eval  ', 11))
let val = eval(ast); 

console.log('\n'); 
console.log('- SE Log End ------------------'); 
console.timeEnd(padStart('eval  ', 11))

console.log(padStart('result ', 10), ':', val); 



