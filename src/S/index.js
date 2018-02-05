const padStart = require('string.prototype.padstart')
    , padEnd = require('string.prototype.padend')

module.exports = S; 

// DEBUG MODE 
S.DEBUG = false; 

// Helper Func 
/**
 * @description 返回定长的 tab 
 * @param   { Number }  deep 
 * @returns { String }
 */
let tab = deep => '    '.repeat(deep); 

/**
 * @description 构造 S 表达式
 * @param { Array } list 
 */
function S(list){
    this.list = list;
}

/**
 * @description Alias 
 * @param   { String } todo 
 * @returns { S } 返回 S 表达式 
 */
S.$ = list => new S(list); 

/**
 * @description S 表达式自己打印自己 
 * @param { Number  } deep = 0, 深度 
 */
S.prototype.log = function(deep = 0){
    // let [ todo, ...args ] = this.list; 

    let before = s => padStart(
        ((s ? 's-exp ': '') + `${deep}:`), 
        12
    ) + ' ' + tab(deep); 

    // console.log(before(true) + todo); 

    this.list.forEach((e, idx) => {
        if (e instanceof S){
            e.log(deep + 1); 
            // if (idx === 0){
            //     e.log(deep); 
            // } else {
            //     e.log(deep + 1); 
            // }
        } else {
            console.log(before(false) + e); 
        }
    })
}

/**
 * @description S-forEach
 * @param { Function } fn 
 */
S.prototype.forEach = function(fn){
    this.list.forEach(fn); 
}

/**
 * @description 第 n 个 
 * @param { String | Number } n 
 * @returns { * }
 */
S.prototype.at = function(n){
    return this.list[n]; 
}

/**
 * @description 取头部 
 * @returns { * }
 */
S.prototype.first = function(){
    return this.at(0); 
}
