import { Scope } from "./index";
import { rawParse } from "../parse";
import fs from 'fs';
import path from 'path';

// global socpe
export const global_scope = new Scope();

global_scope.set('__GLOBAL__', '1')

global_scope.set('+', (runner, $, restExp) => {
    const temp = restExp.map(e => runner(e, $));
    return temp.reduce((a, b) => a + b);
})

global_scope.set('*', (runner, $, restExp) => {
    const temp = restExp.map(e => runner(e, $));
    return temp.reduce((a, b) => a * b);
})

global_scope.set('-', (runner, $, restExp) => {
    const temp = restExp.map(e => runner(e, $));
    return temp.reduce((a, b) => a - b);
}) 

global_scope.set('/', (runner, $, restExp) => {
    const temp = restExp.map(e => runner(e, $));
    return temp.reduce((a, b) => a / b);
})

global_scope.set('inc', (runner, $, restExp) => {
    return runner(restExp[0], $) + 1;
}) 

global_scope.set('log', (runner, $, restExp) => {
    console.log('SE 内部 IO >> ', runner(restExp[0], $))
    return 0;
});

global_scope.set('sin', (runner, $, restExp) => {
    return Math.sin(runner(restExp[0], $));
})

global_scope.set('>', (runner, $, restExp) => {
    const [L, R] = restExp;
    return runner(L, $) > runner(R, $) ? 1 : 0;
}); 

global_scope.set('<', (runner, $, restExp) => {
    const [L, R] = restExp;
    return runner(L, $) < runner(R, $) ? 1 : 0;
}); 

global_scope.set('=', (runner, $, restExp) => {
    // (= L R)
    const [L, R] = restExp;

    return runner(L, $) === runner(R, $) ? 1 : 0;
}); 

global_scope.set('remainder', (runner, $, restExp) => {
    const [v] = restExp;
    return runner(v, $) % 2;
});

global_scope.set('define', (runner, $, restExp) => {
    // (define var (EXP))
    // (define (fnName, args) (BODY))
    const [defineVar, ...defineExps] = restExp;

    if (typeof defineVar === 'string') {
        $.set(defineVar, runner(defineExps[0], $))
        return 0;
    } else {
        const [fnName, ...args] = defineVar;

        if (typeof fnName !== 'string') throw new Error('define 的函数名不能是表达式 ' + fnName);

        $.set(fnName, runner(['lambda', args, ...defineExps], $))

        return 0;
    }
});

global_scope.set('if', (runner, $, restExp) => {
    // (if (CONDITION) (TRUE_ONE) (FALSE_ONE))
    const [condition, true_one, false_one] = restExp;

    const bool = runner(condition, $) as 0 | 1;

    if (bool) {
        return runner(true_one, $)
    } else {
        return runner(false_one, $)
    }
});

global_scope.set('lambda', (runner, $, restExp) => {
    // $ 函数声明所在的作用域

    // (lambda (x y) (+ x y) ... )
    const [varNames, ...bodies] = restExp;

    if (typeof varNames === 'string') throw new Error('lambda 函数定义错误:' + restExp);
    if (bodies.length === 0) throw new Error('找不到 lambda 函数体 ' + restExp)

    // 下面返回的函数的类型跟 BuildInFunction 是一样的
    // 也就是说，lambda 这个函数本身返回一个函数
    return function SE_LAMBDA(_1, $WHEN_INVOKE, args) {
        // 新建作用域
        const $$ = $.extend();


        for (let idx = 0; idx < varNames.length; idx ++) {
            const varName = varNames[idx];

            if (varName === '.') {
                const trueName = varNames[idx + 1];
                if (typeof trueName === 'string') {
                    const L = args.slice(idx).map(arg => runner(arg, $WHEN_INVOKE));
                    $$.set(trueName, L)
                } else {
                    throw new Error('点分参数书写错误:' + varNames);
                }
                break;
            }

            if (typeof varName === 'string') {
                if (typeof args[idx] !== 'undefined') {
                    $$.set(varName, runner(args[idx], $WHEN_INVOKE))
                } else {
                    $$.set(varName, null);
                }
            } else {
                throw new Error('lambda 函数定义错误' + varNames);
            }
        }

        // return runner(body, $$);
        const tmps = bodies.map(body => runner(body, $$));
        return tmps[tmps.length - 1];
    };
});

global_scope.set('apply', (runner, $, restExp) => {
    // (apply fn b)
    const [fn, b] = restExp;
    const T = runner(b, $);

    // console.log('@', fn, T, restExp);
    // $.log(2);

    return runner([fn, ...T], $);
});


global_scope.set('load', (runner, $, restExp) => {
    // (require FILE)
    const FILE = runner(restExp[0], $);
    const CODE_PATH = path.resolve(__dirname, '../../example', FILE)
    const CODE = fs.readFileSync(CODE_PATH, 'utf-8');
    const CODE_BLOCKS = rawParse(CODE);

    CODE_BLOCKS.forEach(CB => runner(CB, $));
    
    return 0;
})
