const getExp = require('./getExp')
    , S = require('../S')
    // , Clojure = require('../Clojure')

module.exports = parse; 

/**
 * @description parse 
 * @param { String } text 
 */
function parse(text){
    text = text.split('\n')
        .map(line => {
            let pos = line.indexOf(';'); 
    
            if (pos !== -1){
                return line.substring(0, pos)
            } else {
                return line; 
            }
        })
        .join('\n')
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '')


    let chars = text.split(' ')
                    .filter(e => e);
    
    let ast_blocks = parseBlock(chars); 
    
    ast_blocks.forEach((exp, idx) => {
        S.DEBUG && console.log(`第 ${idx + 1} 个块` ); 
        exp.log(); 
        S.DEBUG && console.log('\n'); 
    }); 

    return ast_blocks; 
}

/**
 * @description 处理行 
 * @param { Array<String> } chars 
 * @param { Array<S> } blocks 
 */
function parseBlock(chars, blocks = []){
    let { exp, len } = getExp(chars); 

    let nextChars = chars.slice(len + 1); 

    blocks.push(exp); 

    if (nextChars.length === 0){
        return blocks; 
    } else {
        return parseBlock(nextChars, blocks); 
    }
}
