import 'colors';

import { Scope, global_scope, ScopeVar } from '../scope';

export function runAll(rawExps: RawExp) {
    const $ = global_scope.extend();

    const all = rawExps.map((exp, i) => {
        return runner(exp, $);
        // console.log('\n');
    });

    console.log('\n\n\n\n\n 每个代码块的结果：', all);
}

function runner(rawExp: string | RawExp, $: Scope): ScopeVar {
    if (typeof rawExp === 'string' || typeof rawExp === 'number') {
        const target = $.get(rawExp);

        if (typeof target === 'undefined') {
            $.log()
            throw new Error('找不到变量: ' + rawExp);
        } 
        
        return target;
    } else {
        // console.log(rawExp);
        // console.log($.log());
        // console.log('\n')

        const [x, ...xs] = rawExp;

        const target = runner(x, $);

        if (typeof target === 'undefined') throw new Error('无法处理: ' + rawExp); 

        if (typeof target === 'number') throw new Error('函数为数字，无法处理:' + rawExp);

        // 内建函数
        if (typeof target === 'function') return target(runner, $, xs);

        if (target === null) throw new Error('null 不能作为函数执行 ' + rawExp);

        return runner(target, $)
    }
}
