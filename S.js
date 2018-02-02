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
    let [ todo, ...args ] = this.list; 

    let before = s => ((s ? 's-exp ': '') +
            `${deep}:`).padStart(12)+ ' ' + tab(deep); 

    console.log(before(true) + todo); 

    args.forEach(e => {
        if (e instanceof S){
            e.log(deep + 1); 
        } else {
            console.log(before(false) + e); 
        }
    })
}
