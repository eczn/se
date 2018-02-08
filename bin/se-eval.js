const fs = require('then-fs')
    , parse = require('../src/parse')
    , S = require('../src/S')
    , eval = require('../src/eval')
    , padEnd = require('string.prototype.padend')
    , padStart = require('string.prototype.padStart')

module.exports = seEval; 

function seEval(...args){
    let [file_abs, mode_config, ...params] = args; 
    let text; 
    
    try {
        text = fs.readFileSync(file_abs).toString(); 
    } catch (err){
        console.log(`${file_abs} Not Found !`); 
        return; 
    }

    if (mode_config.debug) S.DEBUG = true; 


    if (S.DEBUG) {
        console.log('SE Code: '); 
        console.log(text); 
        console.log('\n'); 
    }

    console.time(padStart('parse  ', 11))
    let ast = parse(text); 
    console.timeEnd(padStart('parse  ', 11))
    console.log('parse ok'); 


    console.log('\n'); 
    console.log('- SE Log Start ----------------', '\n\n'); 
    console.time(padStart('eval  ', 11))
    let val = eval(ast); 

    console.log('\n'); 
    console.log('- SE Log End ------------------'); 
    console.timeEnd(padStart('eval  ', 11))

    console.log(padStart('result ', 10), ':', val); 





}
