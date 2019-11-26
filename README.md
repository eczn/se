
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
7. [x] lambda 闭包


# Usage 

``` bash 
$ git clone https://github.com/eczn/se.git 
$ cd se 
$ npm i 
$ tsc
# 命令行工具
$ npm link 
```

关于命令行用法： 

``` bash
$ se <file>
```

# SE Syntax 

SE 的实现参考了 Scheme 的语法（本人也不是很懂 scheme）。。。 

目前实现了一部分，，自己玩玩学学。 

# Example

参见 [example](./example)


