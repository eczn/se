module.exports = S; 

/**
 * @description 构造 S 表达式
 * @param { Array }  list
 */
function S(list){
    this.list = list;
}

S.DEBUG = false; 

let tab = deep => '    '.repeat(deep); 

S.prototype.log = function(deep = 0){
    let [ todo, ...args ] = this.list; 

    let before = s => ((s ? 's-exp ': '') +
            `${deep}:`).padStart(12)+ ' ' + tab(deep); 

    S.DEBUG && 
        console.log(before(true) + todo); 

    args.forEach(e => {
        if (e instanceof S){
            e.log(deep + 1); 
        } else {
            S.DEBUG && 
                console.log(before(false) + e); 
        }
    })
}

/**
 * @description Alias 
 * @param { String } todo 
 */
S.$ = list => new S(list); 
