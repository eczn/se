const getExp = require('./getExp')

module.exports = parse; 

function parse(text){
    let chars = text.replace(/\(/g, ' ( ')
                    .replace(/\)/g, ' ) ')
                    .replace(/\n/g, '')
                    .replace(/\r/g, '')
                    .replace(/\t/g, '')
                    .split(' ')
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

    let { exp } = getExp(chars); 

    // console.log(text.trim());
    // console.log(chars); 
    
    exp.log(); 

    return exp; 
}
