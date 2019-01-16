const S = require('../S'); 
const parse = require('./index'); 
const path = require('path'); 
const fs = require('fs');
const code = fs.readFileSync(path.join(__dirname, './parse-test.se'), 'utf-8'); 

S.DEBUG = true; 

const s = parse(code); 



