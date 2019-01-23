// const Scope = require('./index')
const fs = require('fs'); 
const path = require('path');
const S = require('../S')

const lib = fs.readFileSync(path.join(__dirname, './lib.se'), 'utf-8'); 

module.exports = function global_inject(parse, eval, scope){
    const pre = S.DEBUG; 
    S.DEBUG = false; 
    scope.define('__INJECTED__', true); 
    S.DEBUG = pre; 

    eval(parse(lib), scope); 

    scope.define('PI', Math.PI); 

    return scope; 
}; 

