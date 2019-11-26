interface Vars<T> {
    [key: string]: T
}

export class Scope<T = any> {
    next: Scope<T> | null = null;
    vars: Vars<T> = {};

    find(key: string): T | null {
        let { next, vars } = this; 

        let target = vars[key]; 
        
        if (typeof target !== 'undefined') {
            return target;
        } else {
            return next ? next.find(key) : null; 
        }
    }

    set(key: string, t: T) {
        this.vars[key] = t;
    }

    extend() {
        const newScope = new Scope<T>();
        newScope.next = this;
        return newScope;
    }

    log(deep = 0) {
        const tab = '  '.repeat(deep);
        Object.keys(this.vars).forEach(K => {
            const t = typeof this.vars[K] === 'function' ? 'INNER_INJECTED' : JSON.stringify(this.vars[K]);
            console.log(tab + K + ':', t);
        });

        if (this.next) {
            this.next.log(deep + 1);
        }
    }
}

export * from './global-scope';
