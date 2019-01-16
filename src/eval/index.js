const Scope = require('../Scope')
    , S = require('../S')
    , Clojure = require('../Clojure')

let calc = {
    '+': function(...args){
        let scope = this; 

        return args.reduce((acc, cur) => {
            return acc + cur;
        })
    }, 
    '-': (...args) => args.reduce((acc, cur) => acc - cur), 
    'log': (...args) => console.log.apply(console, args),
    '>': (l, r) => l > r, 
    '<': (l, r) => l < r,
    '>=': (l, r) => l >= r, 
    '<=': (l, r) => l <= r,
    // 需要进一步操作 
    '?': true
}

/**
 * @description 执行多个代码块 
 * @param { Array<S> }  ast 
 * @param { Scope    }  scope 
 */
function eval(ast_blocks, scope = Scope.global_scope){

    return ast_blocks.map(ast => {
        // console.log(ast)
        return one(ast, scope); 
        
    }); 
}

module.exports = eval; 

/**
 * @description 执行单个代码块 
 * @param { S  } ast 
 * @param { Scope } scope 
 */
function one(ast, scope){
    let ast_type = typer(ast); 

    if (ast_type === 'S'){
        let { list }   = ast; 
        let [x, ...xs] = list; 

        if (x === 'define'){
            let [key, binding] = xs;
            let val = one(binding, scope); 

            scope.define(key, val); 
        } else if (x === 'lambda') {
            let cljr = Clojure.fromExp(ast, scope); 

            return cljr; 
        } else {
            let base_calc = calc[x]; 

            if (base_calc){
                if (x === '?'){
                    let [con, l, r] = xs; 
                    let todo = one(con, scope) ? l : r; 

                    return one(todo, scope); 
                } else {
                    let cbv = xs.map(item => one(item, scope)); 
                    return base_calc.apply(scope, cbv); 
                }
            } else {
                // func 
                let x_type = typer(x); 
                let func; 

                if (x_type === 'S'){
                    func = one(x, scope); 
                } else {
                    func = scope.find(x); 
                }

                let cbv = xs.map(item => one(item, scope)); 

                // console.log('!!!', func)
                return func.invoke(cbv); 
            }
        }
    } else {
        if (ast_type === 'var'){
            return scope.find(ast, scope); 
        } else {
            if (ast_type === 'string'){
                return ast.substring(1); 
            } else {
                return ast;
            }
        }
    }
}

/**
 * @description 判断 item 的类型
 * @param   { * } item 
 * @returns { String } type
 */
function typer(item){
    if (item instanceof S){
        return 'S'
    } else if (item instanceof Clojure) {
        return 'function'
    } else {
        let type = typeof item; 

        if (type !== 'string'){
            return type; 
        } else {
            if (item[0] === "'"){
                return 'string'
            } else {
                return 'var'
            }
        }
    }
}

exports.one = one; 