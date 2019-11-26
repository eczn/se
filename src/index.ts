#!/usr/bin/env node 

import { rawParse } from './parse';

import fs from 'fs';
import { run } from './runtime';

const cliArgs = process.argv.slice(2);
console.log('入参:', cliArgs);

const [seFile] = cliArgs;

if (seFile) {
    if (fs.existsSync(seFile)) {
        const code = fs.readFileSync(seFile, 'utf-8');
        run(rawParse(code))
    } else {
        console.log('文件不存在:', seFile);
        process.exit(-1);
    }
} else {
    // repl
    
}

