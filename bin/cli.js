#!/usr/bin/env node 

const how2use = require('./how2use')
    , WORK_DIR = process.cwd()
    , path = require('path')
    , seEval = require('./se-eval')

let argv = process.argv.slice(2); 
let [ operation, ...params ] = argv; 

console.log('params', argv); 

let mode_config = {}
let others = argv.filter(param => {
    if (param.startsWith('--')){
        let mode = param.substring(2); 
        console.log('mode:', mode); 

        mode_config[mode] = true; 

        return false; 
    } else {
        return true; 
    }
}); 

let file = others[0]; 

if (!file){
    how2use(); 
} else {
    console.log('\n\n'); 
    let file_abs = ''; 
   
    if (path.isAbsolute(file)){
        file_abs = file;
    } else {
        file_abs = path.join(WORK_DIR, file);
    }

    seEval(file_abs, mode_config); 
}
