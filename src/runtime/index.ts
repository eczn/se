import { Scope, global_scope } from "../scope";

export function run(rawExp: RawExp) {
    const $ = global_scope.extend();

    const ress = rawExp.map(block => {
        return runner(block, $);
    });

    console.log('\n\nEnd... Scope:');
    console.log($.log(1));
    console.log('Result:')
    console.log(ress);
}

export type InjectorFunc = (
    runner: (rawExp: string | RawExp, $: Scope<ScopeVAR>) => any,
    $: Scope<ScopeVAR>,
    restRawExp: RawExp
) => any;

export type ScopeVAR = string | RawExp | InjectorFunc; 

const CLOSURE = Symbol.for('CLOSURE')

export function runner(rawExp: string | RawExp, $: Scope<ScopeVAR>): any {
    console.log(rawExp);
    $.log(1);
    console.log('');

    if (!Array.isArray(rawExp)) {
        if (!isNaN(+rawExp)) {
            return +rawExp;
        }

        if (typeof $.find(rawExp) !== 'undefined') {
            return $.find(rawExp);
        }

        throw new Error('无法对此表达式求值: ' + rawExp)
    } else {
        const [FIRST, ...restRawExp] = rawExp;
        
        if (FIRST === 'define') {
            const [varName, defineExp] = restRawExp;
            
            if (typeof varName === 'string') {
                return $.set(varName, runner(defineExp, $));
            } else {
                // (funcName list)
                const [funcName, ...ARGS] = varName;
                if (typeof funcName !== 'string') throw new Error('函数定义错误: ' + varName);
                return $.set(funcName, ['lambda', ARGS, defineExp])
            }
        }

        if (FIRST === 'lambda') {
            const COPY = JSON.parse(JSON.stringify(rawExp));
            // @ts-ignore
            COPY[CLOSURE] = $;
            return COPY;
        }

        if (FIRST === '?' || FIRST === 'if') {
            const [CONDITION, TRUE_ONE, FALSE_ONE] = restRawExp;

            if (runner(CONDITION, $)) {
                return runner(TRUE_ONE, $);
            } else {
                return runner(FALSE_ONE, $);
            }
        }

        let VAR: ScopeVAR | null = Array.isArray(FIRST) ?
            runner(FIRST, $) :
            $.find(FIRST);

        if (VAR === null) {
            throw new Error(`${FIRST} is not defined`);
        }

        // 逻辑注入
        if (typeof VAR === 'function') {
            return VAR(runner, $, restRawExp);
        } else if (typeof VAR === 'string') {
            return VAR;
        } else {
            const [_1, _2, _3] = VAR;

            if (_1 === 'lambda') {
                if (typeof _2 === 'string') {
                    throw new Error('lambda 定义错误: ' + VAR);
                }
                
                // @ts-ignore
                const $$ = VAR[CLOSURE] ? VAR[CLOSURE].extend() : $.extend();

                _2.forEach((_inner, idx) => {
                    if (typeof _inner !== 'string') throw new Error('lambda 定义出现错误:' + VAR);
                    $$.set(_inner, runner(restRawExp[idx], $))
                });

                return runner(_3, $$);
                     
            }
        }
        
    }
}
