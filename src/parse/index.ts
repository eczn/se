
export interface CodeBlockInfo {
    exp: RawExp,
    len: number
}

function getExp(chars: string[]): CodeBlockInfo {
    let bracket = 0;
    const args: RawExp = [];

    for (let i = 0; i < chars.length; i++){
        let char = chars[i]; 

        if (char === '('){
            bracket = bracket + 1; 
            if (bracket === 1){
                // push next 
                let nextChar = chars[i + 1]; 

                if (nextChar !== '('){
                    args.push(chars[i + 1]);
                    i = i + 1; 
                }

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
                    exp: args, 
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
        exp: args, 
        len: chars.length
    }
}

export function rawParse(_text: string): RawExp {
    const chars = _text.split('\n')
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
        .split(' ')
        .filter(e => !!e)

    // console.log(chars.join(' '));
    return parseBlock(chars);
}

export function parseBlock(chars: string[], blocks: RawExp = []): RawExp {
    let { exp, len } = getExp(chars); 

    let nextChars = chars.slice(len + 1); 

    blocks.push(exp); 

    if (nextChars.length === 0){
        return blocks; 
    } else {
        return parseBlock(nextChars, blocks); 
    }
}
