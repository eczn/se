const Scope = require('../Scope')
    , S = require('../S')

module.exports = eval; 

let calc = {
    '+': function(...args){
        
        
        return args.reduce((acc, cur) => acc + cur)
    }, 
    '-': (...args) => args.reduce((acc, cur) => acc - cur), 
    'log': (...args) => console.log.apply(console, args)
}

/**
 * 
 * @param { S } ast 
 * @param { Scope } scope 
 */
function eval(ast_blocks, scope = Scope.global_scope){

    ast_blocks.forEach(ast => {
        // console.log(ast)
        evalAst(ast, scope); 
    }); 
}

function evalAst(ast, scope){
    const { list } = ast; 
    let [x, ...xs] = list; 

    if (x === 'define'){
        let [key, binding] = xs; 
        
        scope.define(key, binding); 
        return; 
    } else {

        // return calc[x].apply(this, xs); 
    }
}
