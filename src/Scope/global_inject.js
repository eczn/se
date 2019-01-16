// const Scope = require('./index')
const Clojure = require('../Clojure'); 

module.exports = function global_inject(scope){
    scope.define('PI', Math.PI); 
    scope.define('cons', function(l, r) {
        console.log('shit', l, r); 
    })
    return scope; 
}; 

