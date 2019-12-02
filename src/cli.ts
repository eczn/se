import { rawParse } from './parse';

import { runAll } from './exp-calc';

import fs from 'fs';


const cliArgs = process.argv.slice(2);
console.log('入参:', cliArgs);

const [seFile] = cliArgs;

if (seFile) {
    if (fs.existsSync(seFile)) {
        const code = fs.readFileSync(seFile, 'utf-8');
        runAll(rawParse(code))
    } else {
        console.log('文件不存在:', seFile);
        process.exit(-1);
    }
} else {
    // todo repl
    
}