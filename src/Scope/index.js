
const global_inject = require('./global_inject')

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
 * @param { Scope } next_scope 
 */
Scope.prototype.extend = function(next_scope = Scope.of()){
    next_scope.next = this; 

    return next_scope; 
}

/**
 * @description 查找变量
 * @param { String } key 
 * @returns { * }
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

// global_scope
Scope.global_scope = global_inject(new Scope()); 

module.exports = Scope; 
