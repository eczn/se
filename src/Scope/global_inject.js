// const Scope = require('./index')

module.exports = function global_inject(scope){
    scope.define('PI', Math.PI); 

    return scope; 
}; 

