type Pair = Function;

function cons(x: number, y: number): Pair {
    return (how_to_do_it: Function) => {
        return how_to_do_it(x, y); 
    }
}

function car(pair: Pair) {
    return pair((l, r) => l)
}

function cdr(pair: Pair) {
    return pair((l, r) => r)
}

const xy = cons(1, 2); 

const x = car(xy); 

const y = cdr(xy); 

console.log(xy); 
console.log(x); 
console.log(y); 
