module.exports = eval; 

let calc = {
    '+': (...args) => args.reduce((acc, cur) => acc + cur), 
    '-': (...args) => args.reduce((acc, cur) => acc - cur)
}

function eval(ast){
    const { list } = ast; 

    let [x, ...xs] = list; 
    
    return calc[x].apply(this, xs); 
}
