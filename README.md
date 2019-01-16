
> lisp 方言解释器 

# SE 

才刚刚写

# Todos 

e... 有点闲了，写一下看看，看看能写到哪里

1. [x] S 表达式的解析  
2. [x] define 变量声明 (静态作用域)
3. [x] define 函数声明 (First Class Function)
4. [x] lambda 函数调用 (Call-By-Value, CBV)
5. [x] if 语句分支     
6. [x] lambda 递归调用 2333 这个实现了，其他的数据结构的实现也差不多了 2333 比如 pair
7. <s>[ ] 元组类型</s>


# Usage 

``` bash 
$ git clone https://github.com/eczn/se.git 
$ cd se 
$ npm i 
# 如果想要命令行工具的话 
$ npm link 
```

关于命令行用法： 

``` bash
$ se-lang [--debug] [file]
```

# Write & Run 

随后编辑 `./src/code.se` :

``` scheme 
(define sum
    (lambda (n) 
        (? (> n 0) 
            (+ n (sum (- n 1)))
            0)))

;; 5 + 4 + 3 + 2 + 1 + 0
(define sum_of_1_to_5 (sum 5))

;; => 15 
(log sum_of_1_to_5)
```

这段程序与如下的 js 等价： 

``` js
let sum = n => (
    (n > 0) ? 
        n + sum(n - 1) : 
        0
); 

let sum_of_1_to_5 = sum(5); 

console.log(sum_of_1_to_5); 
```

然后解释运行： 

``` bash
# 用 node 执行 test.js 
$ node ./src/test
# 或者使用命令行  
$ se-lang ./src/code.se 
```

输出： 

``` bash
    parse  : 1.312ms
- SE Log Start ---------------- 


15


- SE Log End ------------------
     eval  : 2.744ms
   result  : [ undefined, undefined, undefined ]

```


# SE Syntax 

SE 的实现参考了 Scheme 的语法（本人也不是很懂 scheme）。。。 

目前实现了一部分，，自己玩玩学学。 

# 使用 Pair 

函数式语言里的数据结构可以用 Church Encoding 来实现

``` scheme
;; 定义数据结构 pair 
(define cons
    (lambda (x y)
        (lambda (m)
            (m x y))))

;；取出 pair 的左边
(define car
    (lambda (pair) 
        (pair (lambda (l r) l))))

;; 取出 pair 的右边
(define cdr
    (lambda (pair)
        (pair (lambda (l r) r))))

;; 定义 xy 
(define xy (cons 1 2))

(log xy)
;; (1 . 2)

(log (car xy))
;; => 1

(log (cdr xy))
;; => 2
```

