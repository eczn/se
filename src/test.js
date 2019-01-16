const fs = require('then-fs')
    , parse = require('./parse')
    , S = require('./S')
    , eval = require('./eval')
    , padEnd = require('string.prototype.padend')
    , padStart = require('string.prototype.padStart')
    , path = require('path')

let text = fs.readFileSync(
    path.join(__dirname, './code.se'), 'utf-8'
)

// S.DEBUG = true; 

console.time(padStart('parse  ', 11))
let ast = parse(text); 
console.timeEnd(padStart('parse  ', 11))

console.log('- SE Start ----------------'); 
console.time(padStart('eval  ', 11))
let val = eval(ast); 

console.log('- SE End ------------------'); 
console.timeEnd(padStart('eval  ', 11))

console.log(padStart('lines val ', 10), ':', val); 



