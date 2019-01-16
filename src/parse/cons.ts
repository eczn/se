type Tree = Function;

function Tree<T = number>(v: T, l?: Tree, r?: Tree): Tree {
    return (how_to_do_it: Function) => {
        return how_to_do_it(v, l, r); 
    }
}

function lchild(tree: Tree) {
    return tree((v, l, r) => l);
}

function rchild(tree: Tree) {
    return tree((v, l, r) => r); 
}

function valOf(tree: Tree) {
    return tree((v, l, r) => v); 
}


// 前序遍历
function tralvel(t?: Tree) {
    if (!t) return;

    const l = lchild(t); 
    const r = rchild(t); 
    const v = valOf(t); 

    console.log(v); 
    
    tralvel(l); 
    tralvel(r); 
}

// 创建一棵树。。。 虽然有点绕... 
const t = 
               Tree(1,
    Tree(2, 
Tree(3), Tree(4)), Tree(5, Tree(6)))
// 结构如下： 
//        1
//     /    \
//   2       5 
//  / \     /
// 3   4   6 


// 先序遍历结果
tralvel(t); 
// => 打印：123456
