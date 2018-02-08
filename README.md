
> lisp 方言解释器 

# SE 

才刚刚写

# Todos 

e... 有点闲了，写一下看看，看看能写到哪里

1. [x] S 表达式的解析
2. [ ] define 变量声明 
3. [ ] define 函数声明 


# Usage 

``` bash 
$ git clone https://github.com/eczn/se.git 
$ cd se 
$ npm i
```

随后编辑 `./src/code.se` :

``` scheme 
(define add_xyz
    (lambda (x)
        (lambda (y) 
            (lambda (z) (+ x y z)))))

(((add_xyz 1) 1) 1)

;; 求值结果为 3
```

然后解释运行： 

``` bash
node ./src/test
```

输出： 

``` bash
第 1 个块
          0: define:string
          0: add_xyz:string
          1:     lambda:string
          2:         x:string
          2:         lambda:string
          3:             y:string
          3:             lambda:string
          4:                 z:string
          4:                 +:string
          4:                 x:string
          4:                 y:string
          4:                 z:string


第 2 个块
          2:         add_xyz:string
          2:         1:number
          1:     1:number
          0: 1:number


    parse  : 8.690ms
     eval  : 1.302ms
   result  : [ undefined, 3 ]

```

