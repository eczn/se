import { Scope } from "./index";

import { ScopeVAR } from '../runtime';


export const global_scope = new Scope<ScopeVAR>();

global_scope.set('+', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['+', 'x', restRawExp[0]]];
    }

    return restRawExp.reduce((l, r) => {
        return l + runner(r, $);
    }, 0);
});


global_scope.set('*', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['*', 'x', restRawExp[0]]];
    }

    return restRawExp.reduce((l, r) => {
        return l * runner(r, $);
    }, 1);
});

global_scope.set('/', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['/', 'x', restRawExp[0]]];
    }

    const [first, ...rest] = restRawExp;

    return rest.reduce((res, cur) => {
        return res / runner(cur, $);
    }, runner(first, $));
});


global_scope.set('-', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['-', 'x', restRawExp[0]]];
    }

    const [first, ...rest] = restRawExp;

    return rest.reduce((res, cur) => {
        return res - runner(cur, $);
    }, runner(first, $));
})

global_scope.set('>', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) return ['lambda', ['x'], ['>', 'x', restRawExp[0]]];
    return runner(restRawExp[0], $) > runner(restRawExp[1], $);
});

global_scope.set('>=', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) return ['lambda', ['x'], ['>=', 'x', restRawExp[0]]];
    return runner(restRawExp[0], $) >= runner(restRawExp[1], $);
});

global_scope.set('<', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) return ['lambda', ['x'], ['<', 'x', restRawExp[0]]];
    return runner(restRawExp[0], $) < runner(restRawExp[1], $);
});

global_scope.set('<=', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) return ['lambda', ['x'], ['<=', 'x', restRawExp[0]]];
    return runner(restRawExp[0], $) <= runner(restRawExp[1], $);
});

global_scope.set('=', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['=', 'x', restRawExp[0]]];
    }

    const [l, r] = restRawExp;
    return runner(l, $) === runner(r, $);
});

global_scope.set('remainder', (runner, $, restRawExp) => {
    const [l, r] = restRawExp;
    return runner(l, $) % runner(r, $);
});

global_scope.set('and', (runner, $, restRawExp) => {
    if (restRawExp.length === 1) {
        return ['lambda', ['x'], ['and', 'x', restRawExp[0]]];
    }

    return restRawExp.every(l => {
        return !!runner(l, $);
    });
});

global_scope.set('log', (runner, $, restRawExp) => {
    const R = runner(restRawExp[0], $)
    console.log('RUNTIME_LOGGER:', R);
    return R;
})
