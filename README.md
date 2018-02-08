
> lisp 方言解释器 

# SE 

才刚刚写

# Todos 

e... 有点闲了，写一下看看，看看能写到哪里

1. [x] S 表达式的解析   
2. [x] define 变量声明  
3. [x] define 函数声明 
4. [x] lambda 函数调用
5. [x] if 语句分支 
6. [x] lambda 递归调用 
7. [ ] 元组类型


# Usage 

``` bash 
$ git clone https://github.com/eczn/se.git 
$ cd se 
$ npm i
```

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

然后解释运行： 

``` bash
node ./src/test
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

