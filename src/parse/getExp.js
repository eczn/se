const { S, $ } = require('../S')

module.exports = getExp; 

function getExp(chars){
    let bracket = 0, args = [];

    for (let i = 0; i < chars.length; i++){
        let char = chars[i]; 

        if (char === '('){
            bracket = bracket + 1; 
            if (bracket === 1){
                // push next 
                args.push(chars[i + 1]);
                i = i + 1; 

            } else if (bracket === 2) {
                let innerExp = chars.slice(i); 
                let { exp, len } = getExp(innerExp); 

                args.push(exp); 

                i = i + len - 1; 
            }
        } else if (char === ')'){
            bracket = bracket - 1; 
            if (bracket === 0){
                // 回归 
                return {
                    exp: $(args), 
                    len: i
                } 
            } else {
                // do nothing ...
            }
        } else {
            if (bracket === 1){
                args.push(char);                 
            }
        }
    }

    return {
        exp: $(args), 
        len: i
    } 
}
