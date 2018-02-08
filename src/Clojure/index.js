const S = require('../S')
    , Scope = require('../Scope')
    , eval = require('../eval')

module.exports = Clojure; 

/**
 * @description 构造闭包 
 * @param { S } fn_exp 
 * @param { S } fn_type_args 
 * @param { Scope } scope 
 */
function Clojure(fn_exp, fn_type_args, scope){
    this.fn_exp       =    fn_exp; 
    this.fn_type_args =    fn_type_args; 
    this.scope        =    scope; 
}

/**
 * @description 从 S-Exp 中构造闭包 
 * @param { S } lambda_exp
 * @param { Scope } scope 
 */
Clojure.fromExp = function(lambda_exp, scope){
    // 解构 
    let [ , fn_type_args, fn_exp] = lambda_exp.list; 

    S.DEBUG && console.log(lambda_exp.list)

    return new Clojure(fn_exp, fn_type_args, scope); 
}

/**
 * @description 执行函数体
 * @param { Array<S> } args 
 */
Clojure.prototype.invoke = function(args){
    let { fn_exp, fn_type_args, scope } = this; 

    let new_scope = scope.extend(); 

    fn_type_args.forEach((var_name, idx) => {
        let val = args[idx]; 
        new_scope.define(var_name, val); 
    }); 

    let eval_res = eval.one(fn_exp, new_scope); 

    return eval_res; 
}
