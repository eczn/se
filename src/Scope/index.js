const S = require('../S')
    , Clojure = require('../Clojure')

/**
 * @description 构造函数
 */
function Scope(){
    this.next = null; 
    this.vars = {}; 
}

/**
 * @description 别名 
 * @returns { Scope }
 */
Scope.of = () => new Scope(); 

/**
 * @description 变长 
 * @param   { Scope } next_scope 
 * @returns { Scope }
 */
Scope.prototype.extend = function(next_scope = Scope.of()){
    next_scope.next = this; 

    return next_scope; 
}

/**
 * @description 查找变量
 * @param { String } key 
 * @returns { S | Clojure }
 */
Scope.prototype.find = function(key){
    let { next, vars } = this; 

    let target = vars[key]; 
    
    if (target){
        return target
    } else {
        return next ? next.find(key) : null; 
    }
}

/**
 * @description 声明变量
 * @param { String } key 
 * @param { * } binding 
 */
Scope.prototype.define = function(key, binding){
    let { vars } = this; 

    vars[key] = binding; 

    return this; 
}

/**
 * @description get scope length 
 * @returns { Number } length 
 */
Scope.prototype.getLength = function(){
    let i = 0, scope = this; 

    while (scope){
        scope = scope.next; 
        i = i + 1; 
    }

    return i; 
}

// global_scope
Scope.global_scope = new Scope(); 

module.exports = Scope; 
