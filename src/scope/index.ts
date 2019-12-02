import { rawParse } from "../parse";

// old
// type BuildInFunction = (
//     nums: number[]
// ) => number

type BuildInFunction = (
    runner: (exp: string | RawExp, $: Scope) => any,
    $: Scope,
    restExp: RawExp,
) => number | BuildInFunction

export type ScopeVar = string | number | null | RawExp | BuildInFunction;

export class Scope {
    vars: {
        [key: string]: ScopeVar
    } = {};

    outter: Scope | null = null;
    
    get(key: string): ScopeVar {
        if (key[0] === '"') {
            return key.slice(1, -1);
        }

        if (key === 'null') {
            return null;
        }

        if (Number.isNaN(+key)) {
            const target = this.vars[key];

            if (typeof target === 'undefined' && this.outter) {
                return this.outter.get(key);
            } else {
                return this.vars[key];
            }
        } else {
            // key 本身是数字型的字符串
            return + key
        }
    }

    extend() {
        const newScope = new Scope();
        newScope.outter = this;
        return newScope;
    }

    set(key: string, val: ScopeVar) {
        if (typeof this.vars[key] !== 'undefined') throw new Error('重复声明变量 ' + key + val);

        this.vars[key] = val;
    }

    log(deep = 0) {
        const tab = '  '.repeat(deep);
        Object.keys(this.vars).forEach(K => {
            const value = this.vars[K];

            const t = typeof value === 'function' ? (value.name || 'BUILDIN') : JSON.stringify(this.vars[K]);
            console.log(tab + K + ':', t);
        });

        if (this.outter) {
            this.outter.log(deep + 1);
        }
    }
}

export * from './global_scope';
