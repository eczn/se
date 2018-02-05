const Scope = require('../Scope')
    , S = require('../S')
    , Clojure = require('../Clojure')

module.exports = eval; 

let calc = {
    '+': function(...args){
        let scope = this; 

        
        
        return args.reduce((acc, cur) => {
            cur = parseInt(cur); 

            if (Number.isNaN(cur)){
                cur = scope.find(cur); 
            }

            return acc + cur;
        }, 0)
    }, 
    '-': (...args) => args.reduce((acc, cur) => acc - cur), 
    'log': (...args) => console.log.apply(console, args)
}

/**
 * @description 执行多个代码块 
 * @param { Array<S> }  ast 
 * @param { Scope    }  scope 
 */
function eval(ast_blocks, scope = Scope.global_scope){

    ast_blocks.forEach(ast => {
        // console.log(ast)
        one(ast, scope); 
    }); 
}

/**
 * @description 执行单个代码块 
 * @param { S } ast 
 * @param { Scope } scope 
 */
function one(ast, scope){
    const { list } = ast; 
    let [x, ...xs] = list; 

    console.log(ast); 

    if (x === 'define'){
        let [key, binding] = xs; 

        // 定义 
        scope.define(key, binding); 

        return ast; 
    } else {

        let todo = scope.find(x); 

        let base_calc = calc[x]; 

        console.log('todo');
        console.log(todo)

        if (todo.first() === 'lambda'){
            let fn_cljr = Clojure.fromExp(todo, scope);

            // 定义函数 
            // scope.define(x ,fn_cljr); 

            
        } else if (base_calc) {

            return base_calc.apply(scope, xs); 

        }
        // return calc[x].apply(this, xs); 


    }
}

eval.one = one; 
