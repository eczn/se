const getExp = require('./getExp')
    , S = require('../S')
    // , Clojure = require('../Clojure')

module.exports = parse; 

/**
 * @description parse 
 * @param { String } text 
 */
function parse(text){
    text = text.replace(/\(/g, ' ( ')
                    .replace(/\)/g, ' ) ')
                    .replace(/\n/g, '')
                    .replace(/\r/g, '')
                    .replace(/\t/g, '')
                    .split('\n')
                    .map(line => {
                        let pos = line.indexOf(';'); 

                        if (~pos){
                            return line.substring(0, pos)
                        } else {
                            return line; 
                        }
                    })
                    .join('\n')
                    

    let chars = text.split(' ')
                    .filter(e => e);
    
    // 处理值 
    chars = chars.map(e => {
        let n = parseInt(e); 
        if (typeof n === 'number' && !Number.isNaN(n)){
            return n; 
        } else {
            return e; 
        }
    })

    
    let ast_blocks = parseBlock(chars); 
    
    ast_blocks.forEach((exp, idx) => {
        console.log(`第 ${idx + 1} 个块` ); 
        exp.log(); 
        console.log('\n'); 
    }); 

    // ast_blocks = ast_blocks.map(ast => {

    // })

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
